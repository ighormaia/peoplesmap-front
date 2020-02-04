import React, { Component, Fragment } from 'react';
import { Map, Marker, WMSTileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './PeoplesMap.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { statesPos } from '../../configs/states';
import { wmsUrl, wmsLayer } from '../../configs/urls';

class PeoplesMap extends Component {
  render() {
    const { peoples } = this.props.data;

    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
      <Fragment>
        <Map
          style={{ height: "400px", width: "100%" }}
          minZoom={5}
          zoom={5}
          center={[-15, -50]}>
            <WMSTileLayer 
              url={wmsUrl} 
              layers={wmsLayer} />

            {peoples.map((people, index) => {
              return (
                <Marker 
                  key={index} 
                  position={statesPos[people.uf]} 
                  icon={L.divIcon({html: 1})}
                />
              )
            })}
        </Map>  
      </Fragment>
    )
  }
}

export default PeoplesMap;