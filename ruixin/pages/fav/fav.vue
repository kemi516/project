<template>
	<view class="fav">
		<view class="ftop">
		</view>
		<view class="container" v-if="fav.length">
			<view class="content" v-for="item in fav">
				<view class="img">
					<image :src="item.img" alt="xx"/>
				</view>
				<view class="name">
					{{item.name}}
				</view>
				<view class="en">
					{{item.enname}}
				</view>
				<view class="price">
					￥{{item.price}}
					<view class="reo" @click="remove(item.name)">
						<svg t="1667317428572" class="icon" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="2505" width="16" height="16">
							<path
								d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z"
								p-id="2506"></path>
							<path
								d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z"
								p-id="2507"></path>
						</svg>
					</view>
				</view>
			</view>
		</view>
		<view class="containers" v-else>
			暂时还没有收藏哦!
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fav: JSON.parse(localStorage.getItem('fav')) || []
			};
		},
		methods: {
			remove(name) {
				console.log("name", name);
				this.fav = this.fav.filter(e => e.name != name);
				localStorage.setItem("fav", JSON.stringify(this.fav))
			},
		}
	}
</script>

<style lang="less">
	.fav {
		height: 100vh;
		background-color: #f7f7f7;

		.ftop {
			width: 100%;
			height: 166rpx;
			background-color: blue;

		}

		.container {
			position: relative;
			top: -66rpx;
			background-color: #fff;
			border-radius: 10rpx;
			margin: 30rpx;
			padding-bottom: 15rpx;
			display: flex;
			flex-wrap: wrap;

			.content {
				margin: 18rpx 0 0rpx 18rpx;
				width: 30%;
				color: gray;

				.img {
					outline: 1rpx solid lightgray;

					img {
						// display:block;
						vertical-align: bottom;
						width: 100%;
					}

					margin-bottom: 20rpx;
				}

				.name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.en {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 22rpx;
					margin-top: 20rpx;
					margin-bottom: 26rpx;
				}

				.price {
					font-size: 26rpx;
					color: blue;
					font-weight: bold;

					.reo {
						float: right;
					}
				}
			}
		}

		.containers {
			width: 100%;
			color: gray;
			height: 66vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
