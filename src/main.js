import { createApp } from 'vue';
import App from './App.vue';
import router from './scripts/router.js';
import store from './scripts/store.js';
import './index.css';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
