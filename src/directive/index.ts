import { App } from 'vue';
import focus from './focus';
import permission from './permission';

export default {
  install(Vue: App) {
    Vue.directive('permission', permission);
    Vue.directive('focus', focus);
  },
};
