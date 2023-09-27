
import React, { useState, useRef, useEffect } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import { Button } from '@mui/material';
import axios from 'axios';

 export function  Directions ({props}) {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('WALKING');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState([]);
  const originRef = useRef(`${props[0].lati+","+props[0].lngi}`);
  const destinationRef = useRef(`${props[0].latf+","+props[0].lngf}`);
  const i = [props[0].lati+","+props[0].lngi];
  const f = [props[0].latf+","+props[0].lngf];

  const URL_BASE = "http://177.70.102.109:3007/biomob-api";


  async function getEvents() {
    axios
      .get(`${URL_BASE}/calcada/lista`)
      .then(function (response) {
        const events = response.data ;
        console.log("calçadas", events);
        var Invertido = events.slice(0).reverse()
        setDirections(Invertido);
        const routes = events.map(item => ({
          origin: {
            lat: item.lati,
            lng: item.lngi
          },
          destino: {
            lat: item.latf,
            lng: item.lngf
          }
        }));
        
        console.log('routes',routes);
        return events;
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .then(function () {
        // sempre será executado
      });


    
  

  }
   
  
    useEffect(() => {
      getEvents();
  
      directions.forEach((route, index) => {
        DirectionsService.route(
          {
            origin: route.origin,
            destination: route.destination,
            travelMode: "WALKING"
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(directions => [...directions, result]);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      });
    }, []);
  
  
  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response);
      }
    }
  };

  const onClick = () => {
    
      setOrigin(`${props[0].lati+","+props[0].lngi}`);
      setDestination(`${props[0].latf+","+props[0].lngf}`);
    
  };

  const onMapClick = (...args) => {
    console.log('onClick args: ', args);
  };

  return (
    <div className="map">
      <div className="map-settings">
        <hr className="mt-0 mb-3" />
        <div className="row">
        
        </div>
        <div>
        <Button className="btn btn-primary" type="Button" onClick={onClick}>
          Visualizar Calçada
        </Button>
        </div>
      
      </div>
      <div className="map-container">
        <GoogleMap
          id="direction-example"
          mapContainerStyle={{
            height: '400px',
            width: '100%',
          }}
          zoom={19}
          center={{
            lat: props[0].lati,
            lng: props[0].lngi,
          }}
          onClick={onMapClick}
        >
          {destination !== '' && origin !== '' && (
            <DirectionsService
              options={{
                destination:`${props[0].lati+","+props[0].lngi}`,
                origin:`${props[0].latf+","+props[0].lngf}`,
                travelMode,
              }}
              callback={directionsCallback}
            />
          )}
          {response !== null && (
            <DirectionsRenderer options={{ directions: response }} />
          )}
        </GoogleMap>
      </div>
    </div>
  )
} ;
