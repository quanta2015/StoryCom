import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import Title from '../../Title';

import './index.less'

const KEY = "AIzaSyBDG2YUxXicahL-Zy21Gu7YZkgqYyT5kbc"

const Map =(data)=> {

  let mapData = {
    mapContainerStyle: {
      width: '100%',
      height: '450px'
    },
    options:{
      mapTypeControl: false
    },
    ...data
  }

  return (
    <div className="sc-map">
      <Title title={data?.title} line={data?.line} />

      <LoadScript googleMapsApiKey={KEY} >
        <GoogleMap {...mapData} >
          <InfoWindow position={mapData.center} >
            <div class="m-info">
              <h1>{data.name}</h1>
              <p>
                <span>{data.code}</span>
                <span>{data.phone}</span>
                <span>{data.fax}</span>
                <span>{data.addr}</span>
              </p>
            </div>
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}


export default React.memo(Map)

