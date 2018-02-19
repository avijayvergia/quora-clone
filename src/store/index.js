import Vue from 'vue';
import Vuex from 'vuex';
import {userRef} from "../middleware/firebase";

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
      const newConnection = {
        [uid]: true,
      };

      if (state.userInfo.friends) {
        Vue.set(state.userInfo.friends, uid, true);
      } else {
        state.userInfo.friends = newConnection;
      }

      userRef.child(`${state.userId}/friends`).set(newConnection);
    }
  },

  getters: {
    getUserId: state => {
      return state.userId;
    },

    getFriendIds: state => {
      return state.userInfo.friends ? Object.keys(state.userInfo.friends) : [];
    },

    getUserName: state => {
      return `${state.userInfo.firstName} ${state.userInfo.lastName}`;
    }
  }
});

export default store;
