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
  //plugin to save state in local storage if page was reloaded
  plugins: [createPersistedState()],
  mutations: {
    addCard(state, payload) {
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
  actions: {
    mutateCard({commit}, payload) {
      commit('addCard', payload);
    }
  },
});
