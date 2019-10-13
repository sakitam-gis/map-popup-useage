<template>
  <div class="app">
    <div class="map-wrap" ref="map"></div>
    <el-date-picker
      class="map-data-picker"
      v-model="innerTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Map, TileLayer } from 'maptalks';
  import { getDevicePixelRatio } from 'main/utils';
  import { showPopover } from './Component/Popup';

  export default {
    name: 'App',
    data() {
      return {
        innerTime: '',
        dialogVisible: false,
      };
    },
    computed: {
      ...mapState({
        time: state => state.map.time,
      }),
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
    watch: {
      time(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.innerTime = newValue;
        }
      },
      innerTime(time) {
        this.$store.dispatch('actionTime', time);
      },
    },
  };
</script>

<style lang="less" scoped>
  .app, .map-wrap {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    .map-data-picker {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 1;
    }
  }

  .app {
    position: relative;
  }
</style>
