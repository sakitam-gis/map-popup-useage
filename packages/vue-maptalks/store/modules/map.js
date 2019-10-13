export const SET_TIME_STRING = 'SET_TIME_STRING';

export default {
  state: {
    time: Date.now()
  },
  getters: {
    time: state => state.time,
  },
  actions: {
    actionTime ({commit, state}, param) {
      commit(SET_TIME_STRING, param)
    },
  },
  mutations: {
    [SET_TIME_STRING] (state, data) {
      state.time = data
    },
  }
}
