<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";
import { useShareStore } from "../stores/share";
import detailRecommentLi from "@/components/detailRecommentLi.vue";
import {
  getDetail,
  getGroup,
  getDescription,
  getFaq,
  getRecommendShows,
} from "@/apis/allDetail";

import { ref, getCurrentInstance, onMounted } from "vue";
import { useKkmStore } from "@/stores/kkms";
const share = useShareStore();
const storek = useKkmStore();
const store = useCounterStore();
const router = useRouter();
const route = useRoute();
const detail = ref();
const related = ref();
const notice = ref();
const issue = ref();
const recomment = ref();
const id = route.query.showID;
// 骨架屏
const loading = ref(true);
// 是否开提醒
const isKQ = ref(false);
getDetail(id).then((res) => {
  detail.value = res.data?.result?.data;
  storek.address = res.data.result.data?.venueName;
  storek.imgs = res.data.result.data?.posterURL;
  if (res.data?.result?.data) {
    loading.value = false;
  }
  if (detail.value.content.includes("<iframe")) {
    const a = detail.value.content.indexOf("<iframe");
    const b = detail.value.content.indexOf("iframe>");
    detail.value.content =
      detail.value.content.slice(0, a) + detail.value.content.slice(b + 7);
  }
  const a = localStorage.getItem("kaishou");
  if (a) {
    const i = JSON.parse(a).includes(id);
    if (i) {
      isKQ.value = true;
    }
  }
});

getGroup(id).then((res) => {
  // detail.value = res.data.result.data;
  related.value = res.data.data;
  // console.log("猜你喜欢", res.data);
});
getDescription(id).then((res) => {
  notice.value = res.data.result.data;
  // console.log("购票须知", res.data);
});
getFaq(id).then((res) => {
  issue.value = res.data.data;
  // console.log("常见问题", res.data);
});
getRecommendShows(id).then((res) => {
  recomment.value = res.data.result.data;
  // console.log("大家都在看", res.data);
});

// 收藏 状态
const isLove = ref(false);
// 弹窗 状态 内容
const isPop = ref(false);
const popContent = ref("");
const popTitle = ref("");

const scrollBox10 = ref(null);

const clickScrollTo = ({ name }) => {
  if (name === 0) {
    setTimeout(() => {
      scrollBox10.value.scrollTop = 0;
    }, 300);
  }
};
//收藏
const addcollect = (show) => {
  if (localStorage.getItem("token") === "Token_ssh") {
    storek.collect.push(show);
    storek.collect = [...storek.collect];
    localStorage.setItem("collect", JSON.stringify([...storek.collect]));
  } else {
    router.push({ path: "/login" });
  }
};
const removecollect = (show) => {
  let arr = JSON.parse(localStorage.getItem("collect")).filter(
    (e) => e?.showOID != show?.showOID
  );
  storek.collect = [...arr];
  localStorage.setItem("collect", JSON.stringify(arr));
};

// 刷新页面
import { detaillStore } from "../stores/detaill.ts";
const isTZ = ref(false);
const storeD = detaillStore();
const backSYG = () => {
  setTimeout(() => {
    if (storeD.keyIndex > 1000) {
      storeD.keyIndex--;
    }
  }, 10);
};
// 全局路由
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    storeD.tranName = "searchTran";
  }
  next();
});

// 动画
// 动画 判断
setTimeout(() => {
  storeD.isTranStore = true;
}, 0);
function xxx() {
  share.showShare = !share.showShare;
}

// 开售提醒
const kaishou = () => {
  const arr = localStorage.getItem("kaishou");
  if (arr) {
    const aaa = JSON.parse(arr);
    aaa.push(id);
    localStorage.setItem("kaishou", JSON.stringify(aaa));
  } else {
    localStorage.setItem("kaishou", JSON.stringify([id]));
  }
};
</script>

<template>
  <Transition :name="storeD.tranName">
    <div v-if="storeD.isTranStore" class="main">
      <!-- top 背景 -->
      <div class="top-bg-box">
        <div class="top-bg" v-lazy:background-image="detail?.posterURL"></div>
        <!-- 导航 -->
        <div class="nav">
          <van-nav-bar
            @click-left="
              storeD.tranName = 'yyZZ';
              storeD.isTranStore = false;
              $router.back();
              backSYG();
            "
            left-arrow
            :fixed="true"
            class="detail-nav detail-nav2"
            :border="false"
          >
            <template #right>
              <img
                @click.stop="xxx"
                class="nav-img"
                src="../../public/assets//3p.png"
                alt=""
              />
            </template>
          </van-nav-bar>
        </div>
        <div class="scroll-box" ref="scrollBox10">
          <div class="content">
            <div class="left">
              <figure>
                <van-image
                  width="120rem"
                  height="170rem"
                  style="transform: translateY(-4rem)"
                  fit="cover"
                  :src="detail?.posterURL"
                />
              </figure>
            </div>
            <div class="right">
              <div>
                <p class="content">
                  <van-skeleton
                    :row="3"
                    :loading="loading"
                    row-width="120rem"
                  />
                  {{ detail?.showName }}
                </p>
                <p v-if="loading">
                  <van-skeleton
                    :row="1"
                    :loading="loading"
                    row-width="120rem"
                  />
                </p>
                <p v-else-if="!loading && detail?.minPrice > 0" class="price">
                  {{ detail?.minPrice }} <span>元起</span>
                </p>
                <p
                  v-else-if="
                    detail?.showStatus?.displayName == '售票中' &&
                    detail?.minPrice == 0
                  "
                  class="quepiao"
                >
                  本节目暂时缺票
                </p>
              </div>
            </div>
          </div>
          <van-tabs
            class="detail-tabs"
            scrollspy
            :offset-top="`${16}vw`"
            :sticky="true"
            line-width="27rem"
            line-height="3rem"
            @click-tab="clickScrollTo"
            :border="false"
          >
            <div class="baitiao"></div>
            <van-tab title="简介">
              <div class="intro">
                <div class="time">
                  <img src="../../public/assets//detail_time.png" alt="" />
                  <p v-if="loading">
                    <van-skeleton
                      :row="1"
                      :loading="loading"
                      row-width="120rem"
                    />
                  </p>
                  <p v-else-if="detail?.showDate != '时间待定'">
                    {{ detail?.firstShowTime }} - {{ detail?.lastShowTime }}
                  </p>
                  <p v-else>{{ detail?.showDate }}</p>
                </div>
                <div class="guide">
                  <img src="../../public/assets//metail_wz.png" alt="" />
                  <div class="right">
                    <div class="left">
                      <p>
                        <van-skeleton
                          :row="1"
                          :loading="loading"
                          row-width="120rem"
                        />{{ detail?.venueName }}
                      </p>
                      <p>{{ detail?.venueAddress }}</p>
                    </div>
                    <figure>
                      <img src="../../public/assets//metail_guide.png" alt="" />
                    </figure>
                  </div>
                </div>
                <div class="baozhang">
                  <img src="../../public/assets//metail_baozhang.png" alt="" />
                  <div class="baozhang-content">
                    <p>摩天轮服务保障</p>
                    <p>票品保真 | 安心交付 | 无票赔付 | 闪电转退</p>
                  </div>
                  <img src="../../public/assets//4I.png" alt="" />
                </div>
              </div>
              <div v-if="related?.length > 0" class="related">
                <div class="related-box">
                  <div class="title"><span>猜你喜欢</span></div>
                  <ul>
                    <li v-for="r in related" :key="r.groupId">
                      <p>{{ r.showDesc }}</p>
                      <p>{{ r.latestShowTimeDesc }}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="operationalPropaganda">
                <div class="box">
                  <img src="../../public/assets//metail_mark.png" alt="" />
                  <span>
                    <van-skeleton
                      :row="5"
                      :animate="true"
                      :loading="loading"
                      row-width="100%"
                    />{{ detail?.operationalPropaganda }}
                  </span>
                </div>
              </div>
            </van-tab>
            <van-tab title="详情">
              <div class="deta">
                <h3>节目详情</h3>
                <div
                  class="image-box content-wrapper more-content"
                  v-html="detail?.content"
                ></div>
              </div>
            </van-tab>
            <van-tab title="须知">
              <div class="notice">
                <h3>
                  <span>购票须知</span
                  ><span>
                    <!-- 查看全部 -->
                  </span>
                </h3>
                <div v-if="notice" class="content-box">
                  <ul>
                    <li v-for="n in notice" :key="n?.icon">
                      <figure>
                        <img v-if="n?.icon" :src="n?.icon" alt="" />
                      </figure>
                      <div>
                        <h6>{{ n?.name }}</h6>
                        <p>{{ n?.value }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-else class="content-box">
                  <p>
                    1、演出详情仅供参考，具体信息以主办方公布信息及现场为准，请准时到场以免错过演出。
                  </p>
                  <p>
                    2、鉴于文体演出票品特殊性(具有时效性、唯一性等特征)，一旦用户与卖家达成有效订单代表交易协议生效，用户不能主动要求取消交易(因演出活动被取消或延期除外)。
                  </p>
                  <p>
                    3、鉴于票品的不可复制性与稀缺性，本平台对本演出(活动)限购数量为6张，平台有权无理由取消任何用户超过限购数量的交易，平台识别同一用户的方式包括但不限于同一注册手机号、同一收货手机号、同一快递地址、同一付款账户、同一下单设备等。
                  </p>
                  <p>
                    4、本平台尽最大努力促使卖家对交易协议的履行，如果卖家付票过程中发生问题，本平台可寻求其它卖家提供更高票面或相同票面更好位置票品代替，否则，平台将全额退款并按订单上约定的赔付方式与金额向用户进行赔付，详细规则请见&lt;常见问题-无票赔付&gt;。
                  </p>
                </div>
                <div class="issue">
                  <h3>常见问题</h3>
                  <ul>
                    <li
                      v-for="i in issue"
                      :key="i?.id"
                      @click.stop="
                        popTitle = i.name;
                        popContent = i.content;
                        isPop = true;
                      "
                    >
                      {{ i?.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </van-tab>
            <van-tab title="推荐">
              <div class="recommend">
                <h3>大家都再看</h3>
                <ul>
                  <detailRecommentLi
                    v-for="r in recomment"
                    :key="r.showOID"
                    :recomment="r"
                  ></detailRecommentLi>
                </ul>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <section class="bottom">
          <div class="box">
            <!-- detail -->
            <figure
              v-if="
                !storek.collect.map((e) => e?.showOID).includes(detail?.showOID)
              "
              @click.stop="addcollect(detail)"
            >
              <img src="../../public/assets//metail_love.png" alt="" />
              <p>收藏</p>
            </figure>
            <figure v-else @click.stop="removecollect(detail)">
              <div
                class="love-active"
                style="background-image: url('../../public/assets//Ze.png')"
                alt=""
              ></div>
              <p>已收藏</p>
            </figure>
            <div class="button">
              <div
                v-if="detail?.showDate != '时间待定' && detail?.minPrice > 0"
                @click="
                  router.push({
                    path: 'buy',
                    query: { id, cityOID: detail.cityOID },
                  })
                "
              >
                立即购买
              </div>
              <div
                v-else-if="
                  !isKQ &&
                  (detail?.showDate == '时间待定' ||
                    detail?.showStatus?.code == 1)
                "
                @click.stop="
                  kaishou();
                  isKQ = true;
                "
                style="
                  background-image: linear-gradient(to left, #1fc1b2, #27e4b3);
                "
              >
                开售提醒
              </div>
              <div
                v-else-if="
                  detail?.showDate == '时间待定' ||
                  detail?.showStatus?.code == 1
                "
                style="background-image: linear-gradient(to left, #ccc, #ccc)"
              >
                已设置提醒
              </div>
              <div
                v-else-if="
                  detail?.showStatus?.displayName == '售票中' &&
                  detail?.minPrice == 0
                "
                style="background-image: linear-gradient(to left, #ccc, #ccc)"
              >
                已缺票登记
              </div>
              <div
                v-else
                style="background-image: linear-gradient(to left, #ccc, #ccc)"
              >
                暂无售票
              </div>
            </div>
          </div>
        </section>
        <section class="pop" :class="{ active: isPop }" @click="isPop = false">
          <div class="content" :class="{ active: isPop }" @click.stop="">
            <div class="zhuti">
              <h4>常见问题</h4>
              <h5>{{ popTitle }}</h5>
              <p>{{ popContent }}</p>
            </div>
            <div class="button" @click.stop="isPop = false">完成</div>
          </div>
        </section>
      </div>
    </div>
  </Transition>
</template>
<style lang="less">
div.detail-nav.van-nav-bar.detail-nav2 {
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 0 20rem;
  box-sizing: border-box;
  position: relative;

  .van-nav-bar__content {
    width: 100%;
    height: 60rem;
  }

  .nav-img {
    width: 20rem;
    height: 20rem;
  }

  .van-nav-bar__left,
  .van-nav-bar__right {
    margin: 0;
    padding: 0;
  }

  .van-badge__wrapper {
    color: #fff;
    font-size: 20rem;
  }
}

// tabs
.van-tabs.van-tabs--line.detail-tabs {
  border-radius: 10rem 10rem 0 0;
  overflow: hidden;
  margin-top: -40rem;
  position: relative;
  z-index: 0;

  .baitiao {
    position: absolute;
    width: 100%;
    height: 50rem;
    background-color: #fff;
    top: 0;
    z-index: 200;
  }
}

.detail-tabs {
  margin-bottom: 15rem;
  overflow: hidden;
  border-radius: 10rem 10rem 0 0;
  background-color: white;

  .van-sticky {
    .van-tabs__wrap {
      height: 50rem;
      border-radius: 10rem 10rem 0 0;

      .van-tabs__nav {
        padding-bottom: 5rem;
      }

      .van-tab--active {
        span {
          color: #333;
          font-weight: 600;
        }
      }

      span {
        display: inline-block;
        height: 100%;
        line-height: 50rem;
        font-size: 15rem;
        color: #999;
      }
    }
  }
}

// 节目详情
.image-box.content-wrapper.more-content {
  > section > section > section > section > section {
    > section:nth-of-type(2) {
      display: none;
    }
  }

  p {
    line-height: 26rem;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>

<!-- 内容主要css -->
<style lang="less" scoped>
.searchTran-enter-from,
.searchTran-leave-to {
  position: fixed;
  top: 0;
  z-index: 100;
  transform: translateX(100vw);
}

.searchTran-enter-active {
  transition: all 0.3s;
}

.searchTran-leave-active {
  transition: all 0.2s;
}

.searchTran-enter-to,
.searchTran-leave-from {
  position: fixed;
  top: 0;
  transform: translateX(0vw);
}

.yyZZ-enter-from {
  position: fixed;
  top: 0;
  z-index: 100;
  transform: translateX(-100vw);
}

.yyZZ-leave-to {
  position: fixed;
  top: 0;
  z-index: 100;
  transform: translateX(100vw);
}

.yyZZ-enter-active {
  transition: all 0.3s;
}

.yyZZ-leave-active {
  transition: all 0.3s;
}

.yyZZ-enter-to,
.yyZZ-leave-from {
  position: fixed;
  top: 0;
  transform: translateX(0vw);
}

.zzYY-enter-from {
  position: fixed;
  top: 0;
  z-index: 100;
  transform: translateX(100vw);
}

.zzYY-leave-to {
  position: fixed;
  top: 0;
  z-index: 100;
  transform: translateX(-100vw);
}

.zzYY-enter-active {
  transition: all 0.3s;
}

.zzYY-leave-active {
  transition: all 0.3s;
}

.zzYY-enter-to,
.zzYY-leave-from {
  position: fixed;
  top: 0;
  transform: translateX(0vw);
}

// 主要内容
.main {
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: hidden;

  figure,
  div,
  ul,
  li,
  h1,
  h2,
  h3,
  p,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  > .top-bg-box {
    position: relative;
    width: 100%;
    height: 100%;
    // height: 240rem;
    z-index: 1;
    display: flex;
    flex-direction: column;

    > .top-bg {
      z-index: -1;
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #54545482;
      filter: blur(16rem) brightness(0.4);
      transform: scale(1.2);
    }

    .nav {
      width: 100vw;
      height: 60rem;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;

      .nav-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(6rem) brightness(0.4);
        transform: scale(8);
      }
    }

    > .scroll-box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;

      > .content {
        width: 100%;
        overflow: hidden;
        position: relative;
        z-index: 2;
        padding: 0 20rem;
        display: flex;
        align-items: flex-end;
        height: 180rem;

        > .left {
          width: 36%;
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;

          > figure {
            width: 100%;

            > img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }

        > .right {
          height: 180rem;
          overflow: hidden;

          > div {
            width: 100%;
            height: 100%;
            padding-left: 20rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;

            > .content {
              color: white;
              font-size: 16rem;
              line-height: 26rem;
              white-space: pre-wrap;
              overflow: hidden;
              -webkit-line-clamp: 4;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
            }

            > .price {
              font-size: 16rem;
              padding: 0;
              margin: 0;
              margin-bottom: 6rem;
              color: red;
            }

            > .quepiao {
              color: red;
              transform: translateY(-5rem);
              background-color: hwb(0deg 2% 1% / 13%);
              display: inline-block;
              width: 140rem;
              text-align: center;
              border-radius: 15rem;
              padding: 4rem 8rem;
              letter-spacing: 2rem;
            }
          }
        }
      }

      .detail-tabs {
        position: relative;
        z-index: 0;
        // margin-top: -40rem;

        .intro {
          padding: 0 20rem;
          width: 100%;
          // height: 100vh;
          background-color: white;

          > div {
            display: flex;
            align-items: center;
            margin: 10rem 0;

            > img {
              width: 20rem;
              height: 20rem;
              margin-right: 8rem;
              flex-shrink: 0;
            }

            &.time {
              > p {
                font-size: 14rem;
                font-weight: 600;
              }
            }

            &.guide {
              align-items: center;
              justify-content: space-between;
              width: 100%;
              overflow: hidden;

              > .right {
                width: 100%;
                display: flex;
                overflow: hidden;
                justify-content: space-between;

                > .left {
                  width: calc(100% - 50rem);
                  flex-shrink: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;

                  > p {
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    &:first-child {
                      font-size: 14rem;
                      color: #000;
                      font-weight: 600;
                    }

                    font-size: 12rem;
                    color: #999;
                  }
                }

                > figure {
                  flex-shrink: 0;
                  width: 50rem;
                  height: 50rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #f6f6f6;
                  border-radius: 50%;

                  > img {
                    width: 30rem;
                    height: 30rem;
                  }
                }
              }
            }

            &.baozhang {
              display: flex;
              justify-content: space-between;
              align-items: center;

              > img {
                flex-shrink: 0;
              }

              > .baozhang-content {
                width: 100%;
                overflow: hidden;

                > p {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 100%;

                  &:first-child {
                    font-size: 14rem;
                    color: #000;
                    margin: 0;
                    font-weight: 600;
                  }

                  &:last-child {
                    color: #999;
                    font-size: 12rem;
                    margin: 0;
                  }
                }
              }

              > img:last-child {
                object-fit: contain;
                width: 10rem;
                height: 10rem;
              }
            }
          }
        }

        .related {
          width: 100vw;
          // background-color: lightblue;
          padding: 10rem 0;
          overflow: hidden;
          overflow-x: auto;

          > .related-box {
            width: 100%;
            padding: 0 20rem;
            display: flex;
            overflow-x: auto;

            &::-webkit-scrollbar {
              width: 0;
              height: 0;
            }

            > .title {
              width: 28rem;
              transform: scale(0.8);
              display: flex;
              flex-shrink: 0;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              background-color: #edededdd;
              border-radius: 4rem;

              > span {
                transform: scale(0.9);
                font-size: 13rem;
                letter-spacing: 1rem;
                flex-shrink: 0;
                text-align: center;
                color: #333;
                display: block;
                padding: 0 5rem;
              }
            }

            > ul {
              display: flex;
              flex-shrink: 0;
              height: 100%;

              > li {
                height: 100%;
                flex-shrink: 0;
                // background-color: lightcoral;
                border-radius: 5rem;
                box-shadow: 0 0 0rem 1rem gainsboro;
                margin: 10rem 0rem 10rem 10rem;
                padding: 10rem 20rem;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: 12rem;
                line-height: 20rem;

                > p {
                  margin: 0;
                  padding: 0;

                  &:first-child {
                    color: #000;
                    font-size: 13rem;
                    font-weight: 600;
                  }

                  color: #999;
                  font-size: 12rem;
                }
              }
            }
          }
        }

        .operationalPropaganda {
          width: 100%;
          padding: 0 20rem;
          margin: 20rem 0;

          > .box {
            border: 1rem solid rgb(226, 226, 226);
            border-radius: 5rem;
            background-color: #f4f4f4;
            text-align: justify;
            padding: 15rem;

            > img {
              width: 24rem;
              object-fit: cover;
              height: 20rem;
              margin-right: 5rem;
            }

            > span {
              font-size: 12rem;
              color: #555;
              letter-spacing: 1rem;
              line-height: 20rem;
            }
          }
        }

        // 详情
        .deta {
          width: 100%;
          // height: 100vh;
          padding: 0 20rem;
          background-color: white;
          margin-top: 30rem;

          > h3 {
            width: 100%;
            padding-top: 20rem;
            border-top: 0.1rem solid rgb(219, 219, 219);
            font-size: 20rem;
            letter-spacing: 1rem;
          }

          > .image-box {
            width: 100%;
            font-size: 16px;
            word-wrap: break-word;
            word-break: break-all;
          }
        }

        // 须知
        .notice {
          padding: 0 20rem;
          width: 100%;
          // height: 100vh;
          background-color: white;
          margin-top: 30rem;

          > h3 {
            width: 100%;
            padding-top: 20rem;
            border-top: 0.1rem solid rgb(219, 219, 219);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            span {
              &:first-child {
                letter-spacing: 1rem;
                font-size: 20rem;
                color: #333;
              }

              &:last-child {
                color: #d22e52;
                font-size: 14rem;
                letter-spacing: 1rem;
              }
            }
          }

          > .content-box {
            > ul {
              > li {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin: 20rem 0;

                > figure {
                  flex-shrink: 0;
                  width: 15rem;
                  height: 15rem;
                  margin: 0;
                  padding: 0;
                  margin-right: 10rem;

                  > img {
                    margin-top: 3rem;
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                  }
                }

                > div {
                  width: 100%;

                  > h6 {
                    font-size: 14rem;
                    font-weight: 600;
                  }

                  > p {
                    font-size: 12rem;
                    color: #999;
                    letter-spacing: 1rem;
                    margin: 0;
                    line-height: 20rem;
                  }
                }
              }
            }

            > p {
              font-size: 12rem;
              line-height: 23rem;
              color: #666;
              margin: 16rem 0;
            }
          }

          > .issue {
            width: 100%;
            margin-top: 30rem;

            > h3 {
              width: 100%;
              padding-top: 20rem;
              border-top: 0.1rem solid rgb(219, 219, 219);
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              font-size: 20rem;
              color: #333;
              margin-bottom: 20rem;
            }

            > ul {
              width: 100%;
              display: flex;
              flex-wrap: wrap;

              > li {
                font-size: 13rem;
                padding: 6rem 18rem;
                background-color: #f0f0f0;
                margin: 5rem 10rem 10rem 0;
                color: #666;
                border-radius: 30rem;
              }
            }
          }
        }

        .recommend {
          width: 100%;
          padding: 0 20rem;
          background-color: #f6f6f6;
          margin-top: 20rem;
          letter-spacing: 1rem;

          > h3 {
            width: 100%;
            padding-top: 20rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 20rem;
            color: #333;
            margin-bottom: 20rem;
          }

          > ul {
            width: 100%;
            height: 100%;
            padding-bottom: 50rem;
          }
        }
      }
    }

    > .bottom {
      height: 67rem;
      box-shadow: 0 0rem 10rem 0 #e1e1e1;
      width: 100%;
      position: fixed;
      bottom: 0;
      background-color: white;
      z-index: 9;

      > .box {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 10rem 20rem;
        box-sizing: border-box;

        > figure {
          flex-shrink: 0;
          width: 40rem;
          // height: 40rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          .love-active {
            height: 60%;
            width: 100%;
            max-height: 26rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 120%;
          }

          > img {
            height: 60%;
            max-height: 26rem;
            object-fit: contain;
          }

          > p {
            display: flex;
            align-items: flex-end;
            height: 40%;
            font-size: 12rem;
            color: #747474;
            margin: 0;
            padding: 0;
          }
        }

        > .button {
          width: 100%;
          height: 100%;
          border-radius: 100rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 16rem;
          letter-spacing: 2rem;
          margin-left: 18rem;
          padding-bottom: 1rem;

          > div {
            background-image: linear-gradient(to left, #f51943, #fd0590);
            width: 100%;
            height: 100%;
            border-radius: 100rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 16rem;
            letter-spacing: 2rem;
          }
        }
      }
    }

    > .pop {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.507);
      opacity: 0;
      transition: all 0.3s;
      pointer-events: none;

      &.active {
        pointer-events: all;
        opacity: 1;
      }

      > .content {
        transform: translateY(140vh);
        background-color: white;
        height: 66vh;
        border-radius: 10rem 10rem 0 0;
        padding: 20rem;
        padding-bottom: 10rem;
        box-sizing: border-box;
        width: 100vw;
        overflow-y: auto;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.active {
          transform: translateY(34vh);
        }

        > .zhuti {
          height: 100%;
          width: 100%;

          &::-webkit-scrollbar {
            width: 0;
          }

          > h4 {
            width: 100%;
            font-size: 16rem;
            font-weight: 500;
            text-align: center;
            margin-bottom: 20rem;
          }

          > h5 {
            font-size: 17rem;
            font-weight: 700;
            color: #333;
          }

          > p {
            font-size: 15rem;
            color: #666;
            line-height: 23rem;
          }
        }

        > .button {
          flex-shrink: 0;
          width: 100%;
          height: 46px;
          line-height: 46px;
          border-radius: 200rem;
          background-image: linear-gradient(to right, #fd058f, #f51944);
          color: white;
          text-align: center;
          font-size: 20rem;
        }
      }
    }
  }
}
</style>
