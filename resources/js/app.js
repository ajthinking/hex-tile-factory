import VueKonva from 'vue-konva'

window.Vue = require('vue');

Vue.use(VueKonva)

// Auto register components
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    el: '#app',
});
