const state = {
  account: "zs"
};

const mutations = {
  setAccount(state, newVal) {
    state.account = newVal;
  }
};

const actions = {};

export default {
  namespace: true,
  state,
  mutations,
  actions
};
