<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			uni.request({
				url:'http://www.kangliuyong.com:10002/addAddress',
				data:{
					appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
					province: '广东省',
					    city: '湛江市',
					    county: '吴川',
				},
				success(res) {
					console.log(res);
				}
			})
		}
	}
</script>

<style lang="less">

</style>
