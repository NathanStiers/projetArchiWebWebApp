import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFinalModal from 'vue-final-modal'
import Toaster from '@meforma/vue-toaster';


createApp(App).use(router).use(VueFinalModal()).use(Toaster, {duration: false}).mount('#app')
