<template>
  <div class="app" ref="map"></div>
</template>

<script>
  import { Map, TileLayer } from 'maptalks';
  import { getDevicePixelRatio } from 'main/utils';
  import { showPopover } from './Component/Popup';

  export default {
    name: 'App',
    data() {
      return {
        dialogVisible: false,
      };
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const map = new Map(this.$refs.map, {
          center: [105.08052356963802, 36.04231948670001],
          zoom: 5,
          minZoom:1,
          maxZoom:19,
          centerCross: true,
          baseLayer: new TileLayer('tile', {
            urlTemplate: `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}${getDevicePixelRatio() > 1.5 ? '@2x' : ''}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejh2N21nMzAxMmQzMnA5emRyN2lucW0ifQ.jSE-g2vsn48Ry928pqylcg`
          }),
          // devicePixelRatio: 2
        });

        const coordinates = map.getCenter().toFixed(3).toArray();

        showPopover('image', map, {
          coordinates,
          width: 450,
          // height: 400,
          autoCenter: false,
        })
      },
    },
  };
</script>

<style scoped>
  .app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
