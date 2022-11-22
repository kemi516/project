import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    SearchBanners: null,
    SearchCategories: null,
    SearchRecommended: null,
    MyMore: null,
    customRecommend: null,
    NoteLists: [],
    PhotoCategories: null,
    PhotoList: null,
    PhotoIndex: 0,
    searchcontent: null,
    hotsearch: null,
    shareState: false,
    recomUl: null,
    tabsActive: 0,
    isToMedia: false,
    childKey: 0,
    notesLis: null,
    ncomment: JSON.parse(localStorage.getItem("noteitem")) || null,
    homemd: false,
  },
  getters: {},
  mutations: {
    search(state, { b, c, r }) {
      state.SearchBanners = b;
      state.SearchCategories = c;
      state.SearchRecommended = r;
    },
    myship(state, slist) {
      state.MyMore = slist;
    },
    Notetop(state, { customRecommend, lists }) {
      state.customRecommend = customRecommend;
      state.NoteLists.push(...lists);
    },
    photo(state, { c, l }) {
      state.PhotoCategories = c;
      state.PhotoList = l;
    },
    photoindex(state, i) {
      state.PhotoIndex = i;
    },
    searchov(state, content) {
      state.searchcontent = content;
    },
    searchhot(state, hot) {
      state.hotsearch = hot;
    },
    // getHomeApi(state, path) {
    //   state;
    //   Vue.axios("https://apis.netstart.cn/xpc" + path).then((res) => {
    //     console.log(res);
    //   });
    // },
    shareStateUpdate(state) {
      state.shareState = !state.shareState;
    },
    refsAdd(state, [key, value]) {
      state[key] = value;
    },
    tabsActiveupdate(state, newDate) {
      state.tabsActive = newDate;
    },
    isToMediaUpdate(s, n) {
      s.isToMedia = !!n;
    },
    leave(s) {
      s.homemd = false;
    },
    enter(s) {
      s.homemd = true;
    },
    updateKey(s) {
      s.childKey++;
      s.homemd = false;
    },
    notecomments(state, n) {
      // state.ncomment = n;
      if (n) {
        localStorage.setItem("noteitem", JSON.stringify(n));
      }
    },
    notesTopic(state, notes) {
      state.notesTopicImgs = notes.customRecommend;
      state.notesLis = notes.list;
    },
    notesComments(state, comments) {
      state.notesComments = comments;
    },
  },
  actions: {},
  modules: {},
});
