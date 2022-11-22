<template>
	<view>
		<view class="search-box">

			<view class="search" @click="search" link>
				请输入
			</view>
		</view>
		<!-- <view v-for="item in image"> -->
		<view class="nav">
			<view v-for="img in image" class="icon" @click="toggle(img.type,img.id)" link>
				<image :src="img.icon.active" alt="" v-if="act==img.id" />
				<image :src="img.icon.inactive" alt="" v-else />
				<view>{{img.name}}</view>
			</view>
		</view>
		<view class="menu">
			<view class="menu-box" v-for="menu in menus" @click="detail(menu.pid)" link>
				<view class="">
					<image :src="menu.smallImg" alt=""/>
					<view class="">
						<p>{{menu.name}}</p>
						<p>{{menu.enname}}</p>
					</view>
				</view>
				<view class="text">
					￥{{menu.price}}
				</view>
			</view>
			<view class="bottom">到底啦！</view>
		</view>
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: [{
						id: 0,
						name: '推荐',
						type: 'isHot',
						icon: {
							active: '/static/images/icons_21.gif',
							inactive: '/static/images/icons_09.gif'
						}
					},
					{
						id: 1,
						name: '拿铁',
						type: 'latte',
						icon: {
							active: '/static/images/icons_18.gif',
							inactive: '/static/images/icons_03.gif'
						}
					}, {
						id: 2,
						name: '咖啡',
						type: 'coffee',
						icon: {
							active: '/static/images/icons_19.gif',
							inactive: '/static/images/icons_05.gif'
						}
					}, {
						id: 3,
						name: '冰淇淋',
						type: 'rena_ice',
						icon: {
							active: '/static/images/icons_20.gif',
							inactive: '/static/images/icons_07.gif'
						}
					}
				],
				act: 0,
				menus: []
			};
		},
		onLoad() {
			uni.request({
				url: 'http://www.kangliuyong.com:10002/typeProducts',

				data: {
					appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
					key: 'isHot',
					value: 1
				},
				success: (res) => {
					console.log(res);
					this.menus = res.data.result
					// this.hotList=res.data.result
				}
			})
		},
		methods: {
			toggle(type, id) {
				this.act = id
				if (type == "isHot") {
					uni.request({
						url: 'http://www.kangliuyong.com:10002/typeProducts',

						data: {
							appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
							key: 'isHot',
							value: 1
						},
						success: (res) => {
							// console.log(res);
							this.menus = res.data.result
							// this.hotList=res.data.result
						}
					})
				} else {
					uni.request({
						url: 'http://www.kangliuyong.com:10002/typeProducts',

						data: {
							appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
							key: 'type',
							value: type
						},
						success: (res) => {
							console.log(res);
							this.menus = res.data.result
							// this.hotList=res.data.result
						}
					})
				}

			},
			detail(pid) {
				uni.navigateTo({
					url: `/pages/detail/detail?pid=${pid}`,
				})

			},
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}

	}
</script>

<style lang="less">
	.nav {
		width: 100%;
		justify-content: space-evenly;
		display: flex;
		background-color: whitesmoke;

		.icon {
			padding: 20rpx;

			image {
				width: 80rpx;
				height:80rpx;
			}

			text-align: center;
		}
	}

	//到底时
	.bottom {
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box {
		padding: 20rpx;
		box-sizing: border-box;

		.search {
			width: 100%;
			padding: 10rpx;
			box-sizing: border-box;
			text-align: center;
			border-radius: 48rpx;
			background-color: rgb(248, 248, 248);
			color: gray;
		}
	}

	.menu {
		background-color: whitesmoke;
		padding: 30rpx;
		// padding-bottom: 150rpx;

		.menu-box {
			border-radius: 16rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			box-sizing: border-box;
			margin: 20rpx 0;
			background-color: #fff;

			>view {
				// width: 25%;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: gray;

				image {
					width: 200rpx;
					height: 200rpx;
					flex-shrink:0;
					margin-right: 20rpx;

				}

			}

			.text {
				color: #0C34BA;
				font-weight: bold;
			}
		}
	}
</style>
