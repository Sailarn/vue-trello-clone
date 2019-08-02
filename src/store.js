import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onHoldCards: [],
    inProgressCards: [],
    needsReviewCards: [],
    approvedCards: []
  },
  plugins: [createPersistedState()],
  mutations: {
    addCard(state, payload) {
      console.log(payload)
      switch (payload.name) {
        case 'ON-HOLD':
          state.onHoldCards = payload.list;
          break;
        case 'IN-PROGRESS':
          state.inProgressCards = payload.list;
          break;
        case 'NEEDS-REVIEW':
          state.needsReviewCards = payload.list;
          break;
        case 'APPROVED':
          state.approvedCards = payload.list;
          break;
        default:
          return;
      }
    }
  },
  actions: {},
});
