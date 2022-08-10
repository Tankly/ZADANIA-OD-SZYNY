import cookies from 'js-cookie';

export const state = () => ({
  token: null,
  userData: null,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },

  REMOVE_TOKEN(state) {
    state.token = null;
  },
  
  SET_USER(state, userData) {
    state.userData = userData;
    const parsed = JSON.stringify(userData);
    localStorage.setItem("User", parsed);
  },

  REMOVE_USER(state) {
    state.userData = null;
    localStorage.removeItem("User");
  }
};

export const actions = {
  setToken({dispatch}, {token, expiresIn}) {
    const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
    cookies.set('x-access-token', token, {expires: expiryTime});
    dispatch('loadToken', token)
  },

  loadToken({commit}, token){
    this.$axios.setToken(token, 'Bearer');
    commit('SET_TOKEN', token);
  },

  async refreshToken({dispatch}) {
    const res = await this.$axios.$get('auth/refresh-token');
    dispatch('setToken', {token: res.token, expiresIn: res.expires_in});
  },

  logout({commit}) {
    this.$axios.setToken(false);
    cookies.remove('x-access-token');
    commit('REMOVE_TOKEN');
    commit('REMOVE_USER');
  },

  setUser({commit}, userData){
    commit('SET_USER', userData);
  },
};