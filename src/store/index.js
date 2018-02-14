import Vue from 'vue';
import Vuex from 'vuex';
import { userRef } from "../middleware/firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {
      key: '',
      firstName: '',
      lastName: '',
      sex: '',
      email: '',
      dateOfBirth: '',
      friends: null,
      imageUrl: (() => {
        return this.sex === 'M' ? require('@/assets/male.png') : require('@/assets/female.png');
      })()
    }
  },

  mutations: {
    setUser (state, userInfo) {
      state.userInfo = userInfo.data;
      state.userInfo.key = userInfo.uid;
    },

    addConnection (state, uid) {
      const newConnection = {
        [uid]: true,
      };

      if (state.userInfo.friends) {
        Vue.set(state.userInfo.friends, uid, true);
      } else {
        state.userInfo.friends = newConnection;
      }

      userRef.child(`${state.userInfo.key}/friends`).update(newConnection);
    }
  },

  getters: {
    getUserIds: state => {
      const usersList = [];
      usersList.push(state.userInfo.key);

      if (state.userInfo.friends) {
        usersList.push(...Object.keys(state.userInfo.friends));
      }
      return usersList;
    },

    getUserName: state => {
      return `${state.userInfo.firstName} ${state.userInfo.lastName}`;
    }
  }
});

export default store;
