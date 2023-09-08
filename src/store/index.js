import { createStore } from 'vuex';


export default createStore({
  state: {
    authenticated: false,
    accessToken: null,
    userRole: null,
    accessTokenExpiration: null,
    message: {
      type: null,
      text: null,
    },
  },
  mutations: {
    SET_AUTH(state, auth) {
      state.authenticated = auth;
    },
    SET_ACCESS_TOKEN(state, { token, expiration }) {
      state.accessToken = token;
      state.accessTokenExpiration = expiration;
    },
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_ROLE(state, role) {
      state.userRole = role;
    }
  },
  actions: {
    setAuth({ commit }, auth) {
      commit('SET_AUTH', auth);
    },
    setTokens({ commit }, { accessToken, accessTokenExpiration }) {
      commit('SET_ACCESS_TOKEN', { token: accessToken, expiration: accessTokenExpiration });
    },
    setMessage({ commit }, message) {
      commit('SET_MESSAGE', message);
    },
    
    setRoles({commit} , role) {
      commit('SET_ROLE', role);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
    getMessage(state) {
      return state.message;
    },
  },
  modules: {
  },
});
