import { createApp } from "vue";
import { createPinia } from "pinia";
import { Search} from "vant";
import { Image as VanImage } from 'vant';
import { Swipe, SwipeItem, } from "vant";
import { Tab, Tabs } from 'vant';
import { Sticky } from 'vant';
import { Loading } from 'vant';
import { List } from 'vant';
import { Popup } from 'vant';
import { IndexBar, IndexAnchor } from 'vant';

// const app = createApp();

// const app = createApp();


import vant from "vant";
import { Lazyload } from "vant";
// import { Search, Divider, Swipe, SwipeItem } from "vant";

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
import "vant/lib/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Lazyload);
app.use(vant);

app.mount("#app");
