import {getCurrentUser} from '../../api';
import {showNotify} from 'vant';

const state = {
  currentUser: null
};

const mutations = {
  SET_CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser;
  }
};

const actions = {
  async fetch({commit}) {
    try {
      let res = await getCurrentUser();
      if (res.code === 200 && res.data) {
        commit('SET_CURRENT_USER', res.data);
      } else {
        showNotify({type: 'warning', message: '请登录'});
      }
    } catch (e) {
      showNotify({type: 'warning', message: 'oops!'});
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};