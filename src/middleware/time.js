import moment from 'moment-timezone';

export default {
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      $moment: {
        get() {
          return moment;
        },
      },
    });
  },
};
