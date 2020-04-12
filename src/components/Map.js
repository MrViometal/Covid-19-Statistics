import React, { Component } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from './layers';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibXJ2aW9tZXRhbCIsImEiOiJjazh2ZmFxbzYwaGllM2pvNzB1NHVwOGhwIn0.Zrv_aUz_frAc8QMDDjhgLQ'; // Set your mapbox token here

class Map extends Component {
  state = {
    viewport: {
      height: 500,
      latitude: 40.67,
      longitude: -103.59,
      zoom: 3,
      bearing: 0,
      pitch: 0,
    },
  };

  _sourceRef = React.createRef();

  _onViewportChange = (viewport) => this.setState({ viewport });

  _onClick = (event) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = this._sourceRef.current.getSource();

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      this._onViewportChange({
        ...this.state.viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500,
      });
    });
  };

  render() {
    const { viewport } = this.state;
    const { data } = this.props;

    return (
      <MapGL
        {...viewport}
        width='100%'
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={this._onClick}
      >
        <Source
          type='geojson'
          data='https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={this._sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </MapGL>
    );
  }
}
export default Map;
