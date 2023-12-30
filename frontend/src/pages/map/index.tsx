import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import hoangsa from './hoangsa.png';

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import serviceAPI from '@services/api';
import { mapUIs } from '@mapdata/map';
import MenuIcon from '@mui/icons-material/Menu';
import { MapUI } from '@models/map';
import { CampainUI } from '@models/campain';
import ProgressCustom from '@common/Progess';
import { Link } from 'react-router-dom';

import 'leaflet.markercluster';

import style from './map.module.scss';

interface IMap {
  lat: number;
  long: number;
}

const icon = L.icon({
  iconSize: [13, 20],
  iconAnchor: [5, 20],
  popupAnchor: [2, -20],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
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

const MapPage = () => {
  const [currentPosition, setCurrentPosition] = useState<IMap>({ lat: 0, long: 0 });
  const [search, setSearch] = useState<string>('');
  const [listMap, setListMap] = useState<MapUI[]>([]);
  const mapRef = useRef(null);
  const [detailCampaign, setDetailCampaign] = useState<CampainUI>();
  const [postionSearch, setPostionSearch] = useState<IMap>({ lat: 0, long: 0 });
  const isLandSeaGeoJSON = {
    type: 'Feature',
    properties: {
      name: 'Hoàng Sa Islands',
      description: 'A group of islands in the South China Sea.',
      // You can include additional properties as needed
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [111.07177734375001, 16.785231612264507],
          [111.22558593750001, 17.2696039039649],
          [111.92871093750001, 17.415458569037863],
          [113.02734375000001, 16.891465552988944],
          [112.89550781250001, 15.73360116895393],
          [110.96191406250001, 15.332048675583701],
          [110.93994140625001, 16.492252789302228],
        ],
      ],
    },
  };
  const isLand2SeaGeoJSON = {
    type: 'Feature',
    properties: {
      name: 'Hoàng Sa Islands',
      description: 'A group of islands in the South China Sea.',
      // You can include additional properties as needed
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [112.23632812500001, 9.35511948163477],
          [112.69775390625, 9.105827824137561],
          [112.76367187500001, 9.141525855603676],
          [113.88427734375, 9.342036682200241],
          [113.44482421875001, 10.220626721348296],
          [112.25830078125001, 10.50147613716864],
          [112.26928710937501, 9.37661413297591],
        ],
      ],
    },
  };
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

  const calculatePercent = (current: number, target: number): number => {
    return Number(((current / target) * 100).toFixed(2));
  };
  const calculateDayCountDown = (endDate: Date): number => {
    return Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / 1000 / 60 / 24);
  };
  const renderCard = (data: CampainUI) => (
    <Card
      variant='outlined'
      sx={{
        margin: '10px 10px 20px',
        boxShadow: '0 8px 24px hsla(210,8%,62%,.2)',
        borderRadius: '10px',
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
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
        >
          <Typography
            variant='body2'
            color='text.secondary'
            fontSize={16}
          >
            của mục tiêu {data.targetValue.toLocaleString()} VNĐ
          </Typography>

          <Typography fontSize={16}>953 người ủng hộ</Typography>
        </Box>
      </CardContent>
    </Card>
  );
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
  useEffect(() => {
    try {
      const markers = L.markerClusterGroup({
        iconCreateFunction: (cluster: L.MarkerCluster) => {
          const childCount = cluster.getChildCount();
          const markerOptions: L.DivIconOptions = {
            iconSize: [20, 20], // Adjust the size as needed
            html: `<div ><span>${childCount}</span></div>`, // Custom HTML content
            className: style.marker,
          };

          return L.divIcon(markerOptions);
        },
      });
      const locations = listMap.map((item) => {
        const marker = L.marker([item.lat, item.long], {
          icon:
            item.type === 'EMERGENCY' ? iconEmergency : item.type === 'NORMAL' ? icon : iconItem,
        });

        marker.on('click', () => {
          setDetailCampaign(item.campaign);
        });
        marker.on('mouseover', () => {
          setDetailCampaign(item.campaign);
        });

        return marker;
      });
      markers.addLayers(locations);

      (mapRef.current as any).addLayer(markers);
    } catch (e) {
      console.log('check,', e);
    }
  }, [mapRef.current, listMap]);
  return (
    <React.Fragment>
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
              zIndex: 999999999999999,
              position: 'absolute',
              top: '10px',
              left: '10px',
            }}
          >
            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
              }}
            >
              <IconButton
                sx={{ p: '10px' }}
                aria-label='menu'
              >
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Search  Maps'
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.code === 'Enter') {
                    getAddress(search);
                  }
                }}
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton
                type='button'
                onClick={() => {
                  getAddress(search);
                }}
                sx={{ p: '10px' }}
                aria-label='search'
              >
                <SearchIcon />
              </IconButton>
              <Divider
                sx={{ height: 28, m: 0.5 }}
                orientation='vertical'
              />
            </Paper>
          </div>
          {detailCampaign && (
            <div
              style={{
                zIndex: 999999999999999,
                position: 'absolute',
                top: '70px',
                left: '10px',
              }}
            >
              {renderCard(detailCampaign)}
            </div>
          )}
        </MapContainer>
      )}
    </React.Fragment>
  );
};
export default MapPage;
