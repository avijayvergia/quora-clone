import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUserInfo: {
      key: '',
      firstName: '',
      lastName: '',
      sex: '',
      email: '',
      dateOfBirth: '',
      imageUrl: (() => {
        return this.sex === 'M' ? require('@/assets/male.png') : require('@/assets/female.png');
      })()
    }
  },

  mutations: {
    setUser (state, userData) {
      state.currentUserInfo = userData;
    }
  }
});

export default store;
