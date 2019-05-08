import React, {Component} from 'react';
import MapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
const TOKEN = 'pk.eyJ1IjoiemhsaWFuZzAyMDQiLCJhIjoiY2p1c2F3NzF1MDZkdDQ0bnh6NG4xenF4OSJ9.croYMF8CfRttu_T7bQMUOQ';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
export default class Map extends Component {
constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 52.520008,
        longitude: 13.404954,
        zoom: 12,
        // bearing: 0,
        // pitch: 0,
        width: 500,
        height: 500,
        position: "absolute",
      }
    };
  }
render() {
    const {viewport} = this.state;
return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={TOKEN}>
        <div className="nav" style={navStyle}>
          <NavigationControl/>
          
        </div>
      </MapGL>
    );
  }
}


// ES6
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";



// const Map = ReactMapboxGl({
//   accessToken: "pk.eyJ1IjoiemhsaWFuZzAyMDQiLCJhIjoiY2p1c2F3NzF1MDZkdDQ0bnh6NG4xenF4OSJ9.croYMF8CfRttu_T7bQMUOQ"
// });

// // in render()



// export default class myMap extends Component {
//   render(){
//     return (
//       <Map
//         style="mapbox://styles/mapbox/streets-v9"
//         containerStyle={{
//           height: "500px",
//           width: "500px"
//         }}>
//           <Layer
//             type="symbol"
//             id="marker"
//             layout={{ "icon-image": "marker-15" }}>
//             <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
//           </Layer>
//       </Map>
//     )
//   }
// }