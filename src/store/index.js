import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {
      firstName: '',
      lastName: '',
      sex: '',
      email: '',
      dateOfBirth: '',
      friends: null,
      imageUrl: (() => {
        return this.sex === 'M' ? require('@/assets/male.png') : require('@/assets/female.png');
      })()
    },
    userId: '',
  },

  mutations: {
    setUser (state, userInfo) {
      state.userInfo = userInfo.data;
      state.userId = userInfo.uid;
    },

    addFriend (state, uid) {
      if (state.userInfo.friends) {
        Vue.set(state.userInfo.friends, uid, true);
      } else {
        state.userInfo.friends = {
          [uid]: true,
        };
      }
    }
  },

  getters: {
    getUserId: state => {
      return state.userId;
    },

    getFriendIds: state => {
      return state.userInfo.friends ? Object.keys(state.userInfo.friends) : [];
    },

    getAllIds: (state, getters) => {
      const ids = [];

      ids.push(getters.getUserId);
      ids.push(...getters.getFriendIds);

      return ids;

    },

    getUserName: state => {
      return `${state.userInfo.firstName} ${state.userInfo.lastName}`;
    }
  }
});

export default store;
