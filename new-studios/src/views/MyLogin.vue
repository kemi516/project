<template>
    <div>

        <div class="login">
            <!-- @click="$router.push({ path: '/home/search' })" -->
            <div class="attop">
                <div class="fanh" @click=" $router.back();">
                    <img src="image/返回/mf.png" alt="" />
                </div>
                <h3>注册</h3>
            </div>
            <h1>登录</h1>
            <div class="content">
                <input type="text" placeholder="请输入手机号" v-model="text">
                <input type="password" placeholder="请输入密码" v-model="paswd">
            </div>
            <div class="cl">
                <div class="left">
                    验证码登录
                </div>
                <button @click=" dl">登录</button>
            </div>

        </div>
        <div class="Lbottom">
            <img src="image/login.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            paswd: ''
        }
    },
    // beforeRouteUpdate(to, from, next) {
    //     next();
    //     this.$store.commit("updateKey");
    // },

    methods: {
        dl() {
            setTimeout(() => {
                // 假设是ajax的结果
                let token = 'MaJ6bKsj'

                if (token && this.text == 'kimi' && this.paswd == 'kimi') {
                    // 登陆成功 保存token
                    localStorage.setItem('token', token)
                    // this.$router.back() // 刚才的页面 me并没有进去

                    this.$router.replace(this.$route.query.from)
                } else {
                    // 账号密码错误
                    alert('请输入正确的账号或密码')
                }


            }, 1000);
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    padding: 0 20rem;

    .attop {
        position: relative;

        .fanh {
            position: absolute;
            top: 20rem;
            left: 0rem;
        }

        h3 {
            // font-size: 17rem;
            // font-weight: bold;
            width: 100%;
            text-align: right;
            padding: 22rem 0;
            border-bottom: 1rem solid #9a99992c;
        }
    }

    h1 {
        font-weight: 500;
        font-size: 20rem;
        margin: 30rem 0;
    }

    .content {
        input {
            width: 100%;
            padding: 20rem 0;
            display: block;
            border: 0;
            border-top: 1rem solid rgba(128, 128, 128, 0.193);

            &:nth-child(2) {
                border-bottom: 1rem solid rgba(128, 128, 128, 0.193);

            }
        }
    }

    .cl {
        display: flex;
        justify-content: space-between;
        margin: 30rem 0;

        .left {
            color: #456288;
            margin-top: 6rem;
        }

        button {
            border: 0;
            border-radius: 50rem;
            padding: 6rem 26rem;
        }
    }


}

.Lbottom {
    position: absolute;
    bottom: 0;

    img {
        width: 100%;

    }
}
</style>