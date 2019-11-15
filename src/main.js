import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// on peut inclurer un CSS
require('@/assets/css/main.css');

new Vue({
	render : (h) => h(App)
}).$mount('#app');
