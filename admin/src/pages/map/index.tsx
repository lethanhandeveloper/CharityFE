import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  // useMapEvents,
  GeoJSON,
  ImageOverlay,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import hoangsa from './hoangsa.png';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './style';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import DialogChooseCampaign from './dialogChooseCampaign';
import serviceAPI from '@services/api';
import { mapUIs } from '@services/mapdata/map';
import { MapUI } from '@models/map';
import { CampainUI } from '@models/campain';
import ProgressCustom from '@common/Progess';
import { Link } from 'react-router-dom';
import { ButtonStyle1 } from '@common/Button';
import { isLandSeaGeoJSON, isLand2SeaGeoJSON } from './json';
import DialogAddItem from './dialogAddItem';
interface IMap {
  lat: number;
  long: number;
}
// interface IMapComponent {
//   setLagLog: (data: IMap) => void;
//   isOn: boolean;
// }
const icon = L.icon({
  iconSize: [13, 20],
  iconAnchor: [5, 20],
  popupAnchor: [2, -20],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
});
const iconNormal = L.icon({
  iconSize: [13, 20],
  iconAnchor: [5, 20],
  popupAnchor: [2, -20],
  iconUrl: 'https://img.icons8.com/doodle/48/heart-with-pulse.png',
});
const iconEmergency = L.icon({
  iconSize: [13, 20],
  iconAnchor: [5, 20],
  popupAnchor: [2, -20],
  iconUrl: 'https://img.icons8.com/doodle/48/heart-with-pulse.png',
});
const iconItem = L.icon({
  iconSize: [13, 20],
  iconAnchor: [5, 20],
  popupAnchor: [2, -20],
  iconUrl: 'https://img.icons8.com/plasticine/100/exterior.png',
});
// const MapComponent: FC<IMapComponent> = (props) => {
//   useMapEvents({
//     click(e) {
//       if (props.isOn) {
//         props.setLagLog({ lat: e.latlng.lat, long: e.latlng.lng });
//         alert(e.latlng.lng + ',' + e.latlng.lat);
//       }
//     },
//   });
//   return <></>;
// };
const MapPage = () => {
  // const [dataMap, setLocation] = useState<IMap>({ lat: 0, long: 0 });
  const [currentPosition, setCurrentPosition] = useState<IMap>({ lat: 0, long: 0 });
  const [search, setSearch] = useState<string>('');
  const [listMap, setListMap] = useState<MapUI[]>([]);
  const mapRef = useRef(null);
  const [postionSearch, setPostionSearch] = useState<IMap>({ lat: 0, long: 0 });
  const [openChooseCampaign, setChooseCampaign] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState({ open: false, campaignId: '' });
  useEffect(() => {
    const initCurrentAddress = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            long: longitude,
          });
        });
      }
    };
    initCurrentAddress();
  });

  const getAddress = async (text: string) => {
    const api = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${text}`;
    const response = await fetch(api);
    const data = await response.json();
    if (data[0]) setPostionSearch({ lat: data[0].boundingbox[0], long: data[0].boundingbox[2] });
  };

  useEffect(() => {
    try {
      (mapRef.current as any).flyTo([postionSearch.lat, postionSearch.long], 12);
    } catch (e) {
      console.log(e);
    }
  }, [postionSearch]);

  useEffect(() => {
    const initData = async () => {
      const response = await serviceAPI.map.list();
      setListMap(mapUIs(response.data.result));
    };
    initData();
  }, []);

  const calculatePercent = (current: number, target: number): number => {
    return Number(((current / target) * 100).toFixed(2));
  };

  const calculateDayCountDown = (endDate: Date): number => {
    return Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / 1000 / 60 / 24);
  };

  const renderCard = (data: CampainUI) => (
    <Card
      sx={{
        border: 'none',
        boxShadow: 'none',
        width: '100%',
      }}
    >
      <CardMedia
        sx={{ height: 200, border: 'none', boxShadow: 'none' }}
        image={data.thumbnail}
      />
      <CardContent>
        <Typography
          sx={{
            background: '#f4f4f4',
            padding: '3px 15px',
            position: 'absolute',
            borderRadius: '12px',
            top: '10px',
            margin: '5px 0 0 5px',
          }}
          fontSize={'13px'}
        >
          Còn {calculateDayCountDown(data.endDate)} ngày
        </Typography>

        <Typography
          sx={{
            fontSize: '20px',
            lineHeight: '22px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            textAlign: 'start',
            fontWeight: 'bold',
          }}
        >
          <Link to={`donate/${data.id}`}>{data.title}</Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginTop: '10px' }}>
          <Typography
            fontSize={16}
            variant='body2'
            color='text.secondary'
          >
            Tạo bởi
          </Typography>
          <Typography
            fontSize={14}
            color='#f54a00'
            fontWeight='bold'
          >
            {data.creatorId}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            marginTop: '30px',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              fontSize={16}
              color='#f54a00'
              fontWeight='bold'
            >
              {data.targetValue?.toLocaleString()} VNĐ
            </Typography>
            <Typography
              variant='body2'
              fontSize={16}
              color='text.secondary'
            >
              đã đạt được
            </Typography>
          </Box>

          <Typography fontSize={16}>{calculatePercent(data.targetValue, 10000000000)}%</Typography>
        </Box>
        <ProgressCustom
          variant='determinate'
          value={calculatePercent(data.targetValue, 10000000000)}
          sx={{ height: '10px', borderRadius: '10px', marginTop: '10px' }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            marginTop: '10px',
            justifyContent: 'space-between',
          }}
        ></Box>
      </CardContent>
      <CardActions>
        <ButtonStyle1
          onClick={() => {
            setOpenDialog({ open: true, campaignId: data.id });
          }}
        >
          Nhập vật phẩm
        </ButtonStyle1>
      </CardActions>
    </Card>
  );

  return (
    <React.Fragment>
      {openDialog && (
        <DialogAddItem
          open={openDialog.open}
          campaignId={openDialog.campaignId}
          handleClose={() => {
            setOpenDialog({ open: false, campaignId: '' });
          }}
        />
      )}
      {openChooseCampaign && (
        <DialogChooseCampaign
          open={openChooseCampaign}
          handleClose={() => {
            setChooseCampaign(false);
          }}
          lat={postionSearch.lat}
          long={postionSearch.long}
          campaignId={''}
        />
      )}
      {currentPosition.lat > 0 && (
        <MapContainer
          className='leaflet-map'
          ref={mapRef}
          style={{
            height: '100vh',
            width: '100%',
          }}
          center={[currentPosition.lat, currentPosition.long]}
          zoom={12}
          zoomControl={false}
        >
          {/* <MapComponent
            setLagLog={setLocation}
            isOn={false}
          /> */}
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

          <GeoJSON
            data={isLandSeaGeoJSON as any}
            style={() => ({ fillColor: '#aad3df', fillOpacity: 1, color: '#aad3df' })}
          />
          <GeoJSON
            data={isLand2SeaGeoJSON as any}
            style={() => ({ fillColor: '#aad3df', fillOpacity: 1, color: '#aad3df' })}
          />
          <ImageOverlay
            url={hoangsa}
            opacity={1}
            zIndex={999}
            bounds={[
              [17.371528178207253, 110.72021484375001],
              [15.2639399771884, 113.20312500000001],
            ]}
          />
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'white',
              padding: '5px',
              zIndex: 9999999999,
              borderRadius: '50px',
            }}
          >
            <Grid container>
              <Grid item>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder='Search…'
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSearch(e.target.value);
                    }}
                    onKeyUp={(e) => {
                      if (e.code === 'Enter') {
                        getAddress(search);
                      }
                    }}
                  />
                </Search>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setChooseCampaign(!openChooseCampaign);
                  }}
                >
                  Tạo điểm
                </Button>
              </Grid>
            </Grid>
          </div>
          {postionSearch.lat !== 0 && (
            <Marker
              position={[postionSearch.lat, postionSearch.long]}
              icon={icon}
            />
          )}

          {listMap?.map((item) => (
            <Marker
              position={[item.lat, item.long]}
              icon={
                item.type === 'EMERGENCY'
                  ? iconEmergency
                  : item.type === 'NORMAL'
                  ? iconNormal
                  : iconItem
              }
            >
              <Popup>{renderCard(item.campaign)}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </React.Fragment>
  );
};
export default MapPage;
