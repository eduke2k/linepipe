import Vue from 'vue';
import Vuetify from 'vuetify';
import LogoSvg from './assets/LogoSvg.vue';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      logo: {
        component: LogoSvg,
        props: {
          name: 'logo'
        }
      }
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#3dae2b',
        secondary: '#424242',
        accent: '#c3d601',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
});
