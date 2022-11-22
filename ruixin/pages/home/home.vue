<template>
	<view>
		<view class="header">
			<text v-if="time>=6&&time<12" class="title">早上好!</text>
			<text v-if="time>=12&&time<18" class="title">中午好!</text>
			<text v-if="time>=18&&time<24" class="title">晚上好!</text>
			<text v-if="time==24||time<6" class="title">深夜好!</text>
			<text class="name">Allen</text>
			<view class="search" @click="search">
				请输入
			</view>
		</view>
		<view class="banner">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :autoplay="autoplay" :interval="interval" :current="current"
					@change="toggleCurrent" :duration="duration">
					<swiper-item v-for="(ban,index) in banner" class="ban">
						<view class="swiper-item uni-bg-red">
							<img :src="ban.bannerImg" alt="" mode="aspectFill">
							<view class="text">
								<!-- 	<view>{{ban.title}}</view>
								<p>{{ban.hint}}</p> -->
							</view>
							<!-- <view class="mark" :style="{backgroundColor:`#${ban.image_hue.slice(-6)}`}"></view> -->
						</view>
					</swiper-item>
				</swiper>
				<view class="ul">
					<view class="li" v-for="(item,i) in banner?.length" :class="{act:i==current}" @click="ddd(i)"></view>
				</view >
			</view>
		</view>
		<!-- <h3><span></span></h1> -->
		<view class="hot">
			<text>热门推荐</text>
		</view>
		<HotList :hotList="hotList"></HotList>
		<div class="bottom">到底啦！</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				time: new Date().getHours(),
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				current: 0,
				hotList: []
			}
		},
		onLoad() {
			uni.request({
					url: 'http://www.kangliuyong.com:10002/banner',
					data: {
						appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
					},
					success: (res) => {
						this.banner = res.data.result
						// console.log(this.banner);
					}
				}),
				uni.request({
					url: 'http://www.kangliuyong.com:10002/typeProducts',

					data: {
						appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
						key: 'isHot',
						value: 1
					},
					success: (res) => {
						// console.log(res);
						this.hotList = res.data.result
					}
				})
		},
		methods: {
			toggleCurrent(e) {
				// console.log(e);
				this.current = e.detail.current

			},

			ddd(i) {
				this.current = i
			},
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}

		}
	}
</script>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 15rpx 30rpx;
		box-sizing: border-box;


	}


	.bottom {
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header .name {
		color: #0C34BA;
		font-weight: bold;
	}

	.search {
		width: 60%;
		padding: 10rpx 30rpx;
		border-radius: 48rpx;
		background-color: rgb(248, 248, 248);
		color: gray;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
		position: relative;
	}

	.swiper {
		height: 580rpx;
	}

	.swiper-item {
		position: relative;
		display: block;
		height: 500rpx;
		/* border-radius: 32rpx; */
		background-repeat: no-repeat;
		background-position: bottom center;
		background-size: 100%;
		/* line-height: 300rpx; */
		background-color: antiquewhite;
		text-align: center;
	}

	.hot {
		padding: 30rpx;
	}

	.hot>text {
		border-radius: 0 32rpx 0 0;
		background-color: #0C34BA;
		color: white;
		padding: 20rpx;
	}



	.ban {
		background-color: whitesmoke;
		width: 100%;
		padding: 30rpx;
		/* padding-bottom:0 ; */
		box-sizing: border-box;
	}

	.ban img {
		width: 100%;
		border-radius: 16rpx;
		box-shadow: 0 0 1px grey;

	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}

	.mark {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		/* opacity: 0.; */
		transform: scale(1.5);
		filter: blur(20rpx);

		/* color: transparent; */

		/* background-color:#787878; */
	}

	.text {
		padding: 30rpx;
		/* background-color: aqua; */
		z-index: 3;
		text-align: left;
		color: white;
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 48rpx;
	}

	.text>p {
		font-size: 32rpx;
		color: rgba(255, 255, 255, 0.5);
	}

	.uni-margin-wrap .ul {
		margin: 0;
		padding: 0;
		position: absolute;
		list-style: none;
		display: flex;
		width: 150rpx;
		justify-content: space-between;
		height: 10rpx;
		right: 60rpx;
		bottom: 80rpx;
	}

	.uni-margin-wrap .ul>.li {
		background-color: whitesmoke;
		box-shadow: 0 0 2rpx 0 black;
		/* margin: 10rpx; */
		flex-shrink: 0;
		/* width: 10rpx; */
		height: 5rpx;
		width: 30rpx;
		margin-left: 5rpx;
		/* border-radius: 20rpx; */
	}

	.ul>.li.act {
		background-color: blue;
	}
</style>
