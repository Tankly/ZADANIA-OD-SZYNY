export const state = () => ({
    msg: false,
});

export const mutations = {
  SET_MSG(state, msg) {
    state.msg = msg;
  },

  REMOVE(state) {
    state.msg = null;
  },
};

export const actions = {
  setMsg({commit}, msg){
    commit('SET_MSG', msg)
  },

  dismiss({commit}){
    commit('REMOVE')
  },
};