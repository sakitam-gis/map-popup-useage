export default ({ closeOnHashChange = true }) => ({
  props: {},
  data() {
    return {
      beforeClose: null,
    };
  },
  methods: {
    close() {
      this.doClose();
    },
    getSafeClose() {
      return () => {
        this.$nextTick(() => {
          this.doClose();
        });
      };
    },
    doClose() {
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },
    closePopup(action) {
      this.action = action;
      if (typeof this.beforeClose === 'function') {
        this._close = this.getSafeClose();
        this.beforeClose(action, this, this._close);
      } else {
        this.doClose();
      }
    },
  },
  mounted() {
    if (closeOnHashChange) {
      window.addEventListener('hashchange', this.close);
    }
  },
  beforeDestroy() {
    if (closeOnHashChange) {
      window.removeEventListener('hashchange', this.close);
    }
  },
});
