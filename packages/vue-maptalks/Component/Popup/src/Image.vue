<template>
  <div class="own-popup">
    <el-calendar v-model="innerTime">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import PopoverAction from '../mixins/popover-action';

  export default {
    mixins: [
      PopoverAction({})
    ],
    components: {},
    data() {
      return {
        properties: {},
        innerTime: Date.now(),
      };
    },
    created() {},
    mounted() {},
    computed: {
      ...mapState({
        time: state => state.map.time,
      }),
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
    methods: {
    },
    beforeDestroy() {
      // console.log(this);
    },
  };
</script>

<style lang="less">
  .own-popup {
    width: 100%;
    background: #fff;
    border-radius: 4px;
  }
</style>
