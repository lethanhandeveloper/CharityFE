import React, { FC, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  GeoJSON,
  ImageOverlay,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import hoangsa from '../../images/hoangsa.png';
interface IMap {
  lat: number;
  long: number;
}
interface IMapComponent {
  setLagLog: (data: IMap) => void;
}
const icon = L.icon({
  iconSize: [13, 20],
  iconAnchor: [5, 20],
  popupAnchor: [2, -20],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
});
const MapComponent: FC<IMapComponent> = (props) => {
  useMapEvents({
    click: (e) => {
      props.setLagLog({ lat: e.latlng.lat, long: e.latlng.lng });
      alert(e.latlng.lng + ',' + e.latlng.lat);
    },
    locationfound(e) {
      console.log(e.latlng);
    },
  });
  return null;
};
const MapPage = () => {
  const [dataMap, setLocation] = useState<IMap>({ lat: 0, long: 0 });
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

  return (
    <React.Fragment>
      <MapContainer
        className='leaflet-map'
        style={{
          height: '100vh',
          width: '100%',
        }}
        center={[15.432026740690574, 107.8439179532812]}
        zoom={12}
      >
        <MapComponent setLagLog={setLocation} />
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
        <Marker
          position={[dataMap.lat, dataMap.long]}
          icon={icon}
        ></Marker>
      </MapContainer>
    </React.Fragment>
  );
};
export default MapPage;
