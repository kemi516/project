<template>
    <div v-if="!usershow" class="usershow">
        <van-loading type="spinner" color="red" />
    </div>
    <div class="user" v-else>

        <section class="user-msg" v-if="user"
            :style="`background-image:url('${user.app_background?user.app_background:'image/xpc/图片/69.png'}?x-oss-process=image/resize,m_mfit,h_405,w_720')`">
            <div class="bg">
                <header>
                    <img src="image/xpcAll/l7.png" @click="$router.back()" alt="">
                    <img src="image/xpcAll/i41.png" alt="">
                </header>
                <div class="user-img">
                    <img :src="user.avatar" width="50" alt="">
                    <img v-if="user.vip_status==1" width="15" class="vip" src="image/xpcAll/O_1.png" alt="">
                </div>
                <div class="user-name">
                    <span>{{user?.username}}</span>
                    <img v-if="user.vip_status==1" src="image/xpcAll/5X.png" width="18" alt="">
                </div>
                <p>{{user.occupation}} · {{user.ip_location}}</p>
                <p>{{user.verify_description}}</p>
                <div class="bottom">
                    <ul class="left">
                        <li>
                            <p>{{user.count.count_popularity | matrixing}}</p>
                            <p>人气</p>
                        </li>
                        <li>
                            <p>{{user.count.count_follower | matrixing}}</p>
                            <p>粉丝</p>
                        </li>
                        <li>
                            <p>{{user.count.count_followee | matrixing}}</p>
                            <p>关注</p>
                        </li>
                    </ul>
                    <ul class="right">
                        <li>联系合作</li>
                        <li v-show="!gz.includes(Number($route.query.id))" @click="addgz(Number($route.query.id))">关注
                        </li>
                        <li class="ygz" v-show="gz.includes(Number($route.query.id))"
                            @click="removegz(Number($route.query.id))">已关注</li>
                    </ul>
                </div>
            </div>
        </section>

        <van-tabs v-model="active">
            <van-tab title="作品">
                <ul class="user-production" v-if="shows&&production?.length ">
                    <li v-for="(item,index) in production" :key="index">

                        <div class="left" @click.stop="updateRouter(item)">
                            <img v-lazy="item.resource.cover" width="150" alt="">
                            <span>
                                {{
                                Math.floor(item.resource.duration/ 60)
                                .toString()
                                .padStart(2, "0")
                                }}' {{
                                (item.resource.duration% 60)
                                .toString()
                                .padStart(2, "0")
                                }}"</span>
                        </div>
                        <div class="right">
                            <p>{{item.resource.title}}</p>
                            <p>{{dateCom(new Date(item.resource.publish_time*1000))}}</p>
                            <p>{{item.resource.count.count_like|matrixing}}喜欢 ·
                                {{item.resource.count.count_view|matrixing}} 播放</p>
                            <img src="image/xpcAll/u5.png" width="2" alt="">
                        </div>

                    </li>
                </ul>
                <div class="text" v-if="!shows">
                    <van-loading type="spinner" color="red" />
                </div>
                <div class='text' v-if=" !production?.length">
                    暂无作品
                </div>
            </van-tab>
            <van-tab title="收藏夹">
                <div class="text">
                    暂无收藏夹
                </div>
            </van-tab>
            <van-tab title="专辑">
                <div class="text">暂无专辑</div>
            </van-tab>
            <van-tab title="喜欢">
                <div class="text">还没有喜欢的作品</div>
            </van-tab>
            <van-tab title="资料">
                <ul class="information" v-if="user">
                    <p>基本资料</p>
                    <li v-if="user.sex==1"><span>性别</span>男</li>
                    <li v-else><span>性别</span>女</li>
                    <li><span>所在地区</span>{{user?.location?.province?.name}}
                        {{user?.location?.country?.name}}
                        {{user?.location?.city?.name}}</li>
                    <li><span>简介</span>{{user.about}}</li>
                    <li><span>IP属地</span>{{user.ip_location}}</li>
                </ul>
                <ul class="information" v-if="user">
                    <p>认证信息</p>
                    <li><span>认证身份</span>{{user.occupation}}</li>
                    <li><span>入行年份</span>{{user.entry_year}}</li>
                    <li><span>认证描述</span>{{user.verify_description}}</li>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>


export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user")) || null,
            production: JSON.parse(localStorage.getItem("production")) || null,
            active: 0,
            shows: false,
            usershow: false,
            gz: JSON.parse(localStorage.getItem("gz")) || []
        }
    },
    watch: {
        gz(n) {
            localStorage.setItem("gz", JSON.stringify(n))
        }
    },
    methods: {
        addgz(id) {
            this.gz = [...this.gz, id]
            // console.log(this.gz);
        },
        removegz(id) {
            this.gz = this.gz.filter((e) => e !== id)
        },
        updateRouter(n) {
            this.$router.push({ path: "/media", query: { id: n.resource.id } });
        },
        dateCom(o) {
            let n = new Date();
            if (o.getFullYear() != n.getFullYear()) {
                return o
                    .toLocaleDateString()
                    .split("/")
                    .map((e) => e.padStart(2, "0"))
                    .join("-");
            } else if (o.getDate() + 1 == n.getDate() && o.getMonth() == n.getMonth()) {
                return "昨天" + o.toLocaleTimeString().slice(-10, -3);
            } else if (o.getDate() == n.getDate() && o.getMonth() == n.getMonth()) {
                return o.toLocaleTimeString().slice(-10, -3);
            } else {
                return (o.getMonth() + 1 + '').padStart(2, "0") + "-" + (o.getDate() + '').padStart(2, "0");
            }
        },
    },
    created() {
        this.axios.get("/xpc/user/" + this.$route.query.id).then(res => {
            this.user = res.data.data
            this.usershow = true
            localStorage.setItem("user", JSON.stringify(this.user));
        })
        this.axios.get("/xpc/user/" + this.$route.query.id + "/articles").then(res => {
            this.shows = true
            this.production = res.data.data.list
            localStorage.setItem("production", JSON.stringify(this.production))
        })
    }
}
</script>

<style lang="less" scoped>
.ygz {
    background-color: gray;
    color: black;
}

.usershow {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user {
    overflow-y: auto;



    .user-msg {
        background-position: center;
        background-size: cover;
        color: white;
        padding: 33rem 20rem;
        padding-top: 23rem;
        position: relative;
        z-index: 9;

        .bg {
            position: relative;
            z-index: 89;
        }

        &::after {
            display: block;
            z-index: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            background-color: #00000066;
        }

        // .bg {
        //     background: rgba(242, 244, 244, 0.381);
        // }

        header {
            height: 30rem;
            padding: 10rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
                width: 20rem;
                height: 20rem;


            }
        }

        .user-img {
            margin: 20rem 0;

            img {
                border-radius: 50%;
                border: 1rem solid rgba(128, 128, 128, 0.315);

                &.vip {
                    position: relative;
                    left: -16rem;
                }
            }
        }

        .user-name {
            margin-bottom: 10rem;

            span {
                font-size: 15rem;

            }

            img {
                position: relative;
                left: 5rem;
                top: 3rem;

            }
        }

        p {
            color: rgb(171, 167, 167);
            margin-top: 5rem;
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 33rem;

            ul.left {
                display: flex;

                li {
                    margin-right: 22rem;

                    p {
                        margin-top: 3rem;

                        &:nth-child(1) {
                            color: white;
                        }
                    }
                }
            }

            ul.right {
                display: flex;

                li {
                    background: white;
                    color: black;
                    line-height: 20rem;
                    width: 60rem;
                    text-align: center;
                    line-height: 20rem;
                    border-radius: 20rem;
                    padding: 2rem 5rem;
                    margin-left: 10rem;
                    flex-shrink: 0;

                    &:nth-child(2) {
                        background: #e25140;
                        color: white;
                    }
                }
            }
        }
    }

    .van-tabs {
        .van-tab__pane {
            .text {
                text-align: center;
                line-height: 100rem;
                font-size: 13rem;
                color: rgb(158, 156, 156);
                height: 43vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        ul.user-production {
            padding: 20rem;
            padding-bottom: 0;

            li {
                display: flex;
                margin-bottom: 10rem;

                .left {
                    position: relative;
                    width: 100%;

                    img {
                        width: 100%;
                        box-shadow: 0 0 1rem 0 gray;
                        border-radius: 5rem;
                    }

                    span {
                        position: absolute;
                        bottom: 8rem;
                        right: 8rem;
                        color: rgba(255, 255, 255, 0.737);
                    }
                }

                .right {
                    // position: relative;
                    width: 100%;
                    padding-left: 10rem;
                    text-align: left;
                    display: flex;
                    flex-flow: column;
                    justify-content: space-around;

                    p {
                        margin: 0;

                        &:nth-child(1) {
                            font-weight: bold;
                            font-size: 14rem;
                            // padding-top: 5rem;
                        }

                        &:nth-child(2) {
                            // margin-top: 5rem;
                            color: rgba(128, 128, 128, 0.659);
                        }

                        &:nth-child(3) {
                            // position: absolute;
                            // bottom: 6rem;
                            color: gray;
                        }
                    }

                    img {
                        position: absolute;
                        bottom: 7rem;
                        right: 0;

                    }
                }
            }
        }

        ul.information {
            margin-top: 15rem;
            padding-bottom: 10rem;

            p {
                font-weight: bold;
                margin: 0;
                margin-bottom: 10rem;
                font-size: 14rem;
                padding-bottom: 15rem;
                padding-left: 20rem;
                border-bottom: 1rem solid rgba(240, 240, 240, 0.466);
            }

            li {
                padding: 8rem 20rem;

                span {
                    color: rgb(171, 167, 167);
                    width: 60rem;
                    display: inline-block;
                }
            }
        }
    }
}
</style>