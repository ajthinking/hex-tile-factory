import VueKonva from 'vue-konva'
import Vuex from 'vuex'


window.Vue = require('vue');

Vue.use(VueKonva)
Vue.use(Vuex)

import storeData from "./store/index"

const store = new Vuex.Store(
   storeData
)

// Auto register components
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    el: '#app',
    store
});
