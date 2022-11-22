<template>
  <div class="home">
    <div class="loding" v-if="shows"></div>
    <div v-else>
      <div class="top">
        <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="value" @keyup.enter="
          dval(value);
          $event.target.blur();
        " @click="searchVal = null" />
        <div v-show="value" @click="value = ''" class="xx"></div>
      </div>
      <div class="bottom">
        <div v-if="IsShow && !shows">
          <h3>热门搜索</h3>
          <SearchList v-for="(item, i) in hotSong" :key="i" :item="item" @search-list="dval"></SearchList>
        </div>
        <div v-if="value && !searchVal && searchSong">
          <p class="sp">搜索“{{ value }}”</p>
          <SearchVal v-for="(item, i) in searchSong" :key="i" :item="item" @search-val="dval" />
        </div>
        <div v-if="searchVal">
          <div class="topps">
            <p class="pipei">最佳匹配</p>
            <div class="gs" @click="
              $router.push({
                path: '/artist',
                query: { id: `${multimatch.artist[0].id}` },
              })
            ">
              <div class="tt" v-if="multimatch?.artist">
                <div class="imgs">
                  <img :src="
                    multimatch &&
                    `${multimatch?.artist[0]?.img1v1Url}?imageView=1&type=webp&thumbnail=60x0`
                  " alt="" />
                </div>
                <div class="text">歌手:{{ multimatch?.artist[0]?.name }}</div>
              </div>
              <div class="icon"></div>
            </div>
            <div class="gd" v-if="multimatch?.playlist" @click="
              $router.push({
                path: '/PlayList',
                query: { id: `${multimatch.playlist[0].id}` },
              })
            ">
              <div class="tt">
                <div class="imgs">
                  <img :src="
                    multimatch &&
                    `${multimatch?.playlist[0]?.coverImgUrl}?imageView=1&type=webp&thumbnail=60x0`
                  " alt="" />
                </div>
                <div class="text">
                  <p class="gdtext">歌单:{{ multimatch?.playlist[0]?.name }}</p>
                  <span>{{ multimatch?.playlist[0]?.creator?.nickname }}</span>
                </div>
              </div>
              <div class="icon"></div>
            </div>
          </div>
          <GoGo :song="song" :palybt="palybt" v-for="(item, i) in searchVal" :key="i" :item="item"
            @search-val="$emit('search-val', $event)" />
        </div>
      </div>
      <div class="history" v-if="IsShow">
        <div v-for="(item, i) in history" :key="i">
          <div class="icon">
            <div></div>
          </div>
          <div class="right">
            <div class="text" @click="dval(item)">{{ item }}</div>
            <div class="xs" @click="remover(item)">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import GoGo from "@/components/GoGo.vue";
import vue from "vue";
import SearchList from "@/components/SearchList.vue";
import SearchVal from "@/components/SearchVal.vue";
import _ from 'lodash'
vue.prototype._ = _
export default {
  name: "SearchSong",
  props: ["song", "palybt"],
  components: {
    SearchList,
    SearchVal,
    GoGo,
  },
  data() {
    return {
      hotSong: [],
      searchSong: [],
      searchVal: null,
      multimatch: null,
      value: "",
      IsShow: true,
      go: false,
      shows: false,
      history: JSON.parse(localStorage.getItem("history")) || [],
    };
  },
  methods: {
    remover(item) {
      this.history = this.history.filter((e) => e != item);
    },
    change(value) {
      this.shows = true;
      this.axios
        // https://apis.netstart.cn/music/cloudsearch
        .get("https://apis.netstart.cn/music/search/suggest", {
          params: { keywords: value, type: "mobile" },
        })
        .then((res) => {
          // console.log(res.data.result.songs);
          // console.log(res.data.result.allMatch);
          // this.searchSong = res.data.result.songs;
          this.searchSong = res.data.result.allMatch;
          this.shows = false;
        });
    },
    dval(val) {
      this.shows = true;
      this.value = val;
      // console.log(val);
      // this.IsShow = false;
      this.axios
        //https://apis.netstart.cn/music//search/suggest
        .get("https://apis.netstart.cn/music/cloudsearch", {
          params: { keywords: val },
        })
        .then((res) => {
          this.searchVal = res.data.result.songs;
          this.shows = false;
          // console.log(res.data?.result.songs);
          this.history = [...new Set([val, ...this.history])];
        });
      this.axios
        .get(" https://apis.netstart.cn/music/search/multimatch", {
          params: { keywords: val },
        })
        .then((res) => {
          this.multimatch = res.data?.result;
        });
    },
    // fd(nv) {
    // console.log(_.debounce, nv);
    // }
    // fd =  _.debounce(this.change, 888)
  },
  // remover(item) {
  //   this.history = this.history.filter((e) => e != item);
  // },
  //   sval(val) {
  //     console.log(val);
  //     this.axios
  //       //https://apis.netstart.cn/music//search/suggest
  //       .get(" https://apis.netstart.cn/music/search/multimatch", {
  //         params: { keywords: val },
  //       })
  //       .then((res) => {
  //         this.multimatch = res.data?.result;
  //       });
  //   },
  // },
  created() {
    this.shows = true;
    this.axios.get("https://apis.netstart.cn/music/search/hot").then((res) => {
      // console.log(res.data.result);
      this.hotSong = res.data.result.hots;
      this.shows = false;
    });
    this.fd = _.debounce(this.change, 888)
    // https://apis.netstart.cn/music/search?keywords='value'
  },
  watch: {
    value(nv) {
      if (nv) {
        // _.debounce(this.change(nv), 888)
        this.fd(nv)
        // this.change(nv)
        this.IsShow = false;
      } else {
        this.IsShow = true;
        this.searchVal = null;
      }
    },
    history(nval) {
      localStorage.setItem("history", JSON.stringify(nval));
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  background-color: #fff;
  width: 100%;
  height: 100vh;

  .loding {
    background-image: url("data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7");
    background-repeat: no-repeat;
    background-position: center;
    width: 56vh;
    height: 50vh;
    margin: 0;
  }

  .topps {
    .pipei {
      padding-left: 6rem;
    }

    .gs {
      margin-bottom: 10rem;
      border-bottom: 1rem solid rgba(128, 128, 128, 0.13);
      display: flex;
      justify-content: space-between;

      .tt {
        padding: 6rem;
        display: flex;
        font-size: 17rem;

        .imgs {
          width: 50rem;
          height: 50rem;
          overflow: hidden;
          margin-right: 12rem;
        }

        .text {
          position: relative;
          top: 6rem;

          p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }

      .icon {
        position: relative;

        top: 26rem;
        right: 27rem;

        width: 8px;
        height: 13px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyNiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI5YjliIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTIuOTM5IDIzLjkzOUwxMy44NzkgMTMgMi45MzkgMi4wNjEiLz48L3N2Zz4=);
      }
    }

    .gd {
      margin-bottom: 10rem;

      border-bottom: 1rem solid rgba(128, 128, 128, 0.13);
      display: flex;
      justify-content: space-between;

      .tt {
        padding: 6rem;
        display: flex;
        font-size: 17rem;

        .imgs {
          width: 50rem;
          height: 50rem;
          overflow: hidden;
          margin-right: 12rem;
        }

        .text {
          position: relative;
          top: 6rem;

          p {
            width: 80%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin: 0;
          }

          span {
            color: gray;
            font-size: 12rem;
          }
        }
      }

      position: relative;

      .icon {
        position: absolute;

        top: 26rem;
        right: 27rem;

        width: 8px;
        height: 13px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyNiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI5YjliIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTIuOTM5IDIzLjkzOUwxMy44NzkgMTMgMi45MzkgMi4wNjEiLz48L3N2Zz4=);
      }
    }
  }

  .top {
    padding: 13rem;
    box-shadow: 0 0 1rem 0 gray;
    position: relative;

    input {
      height: 30rem;
      width: 100%;
      padding-left: 30rem;
      border-radius: 20rem;
      border: 0;
      outline: 0;

      background: #ebecec;

      &::-webkit-input-placeholder {
        color: #c9c9c9;
      }
    }

    .xx {
      position: absolute;
      top: 20rem;
      right: 22rem;
      width: 14rem;
      height: 14rem;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
    }
  }

  .bottom {
    padding: 0 13rem;
    padding-top: 13rem;

    h3 {
      padding: 13rem;
    }

    .sp {
      line-height: 50rem;
      font-size: 15rem;
      color: #507daf;
      border-bottom: 1rem solid #ebecec;
    }
  }

  .history {
    &>div {
      font-size: 14rem;
      display: flex;
      margin: 20rem 0;

      // margin-bottom: 15rem;
      .icon {
        width: 10%;

        div {
          margin: 2rem auto;
          width: 15px;
          height: 15px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
        }
      }

      .right {
        width: 90%;
        display: flex;
        border-bottom: 1rem solid rgba(128, 128, 128, 0.13);
        padding-bottom: 10rem;

        .text {
          width: 90%;
        }

        .xs {
          div {
            width: 12px;
            height: 12px;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
          }
        }
      }
    }
  }
}
</style>
