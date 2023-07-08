import {createApp} from 'vue';
import App from './App.vue';
import {Button, Icon, NavBar, Tabbar, TabbarItem} from 'vant';
import Vant from 'vant';
import router from './router';
import store from './store';
import "./global.css"

let app = createApp(App);
// 按需引入vant
// app.use(Button);
// app.use(NavBar);
// app.use(Icon);
// app.use(Tabbar);
// app.use(TabbarItem);


app.use(Vant);
app.use(router);
app.use(store);
app.mount('#app');
