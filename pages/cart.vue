<template>
	<div class="h-screen">
		<div class="py-12">
			<div class="max-w-md mx-auto rounded-lg md:max-w-5xl">
				<div class="md:flex ">
					<div class="w-full p-4 px-5 py-5">
						<div class="col-span-2 p-5">
							<h1 class="text-xl font-medium ">Корзина покупок</h1>
							<cart-item
								v-for="(i, num) in cart"
								:key="num"
								:title="i.title"
								:imageUrl="i.imageUrl"
								:price="i.price"
								:is-auction="i.isAuction"
								:count="i.count"
								:id="i.id" />
							<div class="flex justify-between items-center mt-6 pt-6 border-t">
								<nuxt-link to="/products">
									<div class="flex items-center">
										<span class="text-md font-medium text-blue-500">
											Продолжить покупки
										</span>
									</div>
								</nuxt-link>
								<div class="flex justify-center items-end">
									<span class="text-sm font-medium text-gray-400 mr-1">
										В сумме:
									</span>
									<span class="text-lg font-bold text-gray-800 ">
										{{ cart.reduce((prev, curr) => prev + curr.price * curr.count, 0) }}
										$
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		computed: {
			cart () {
				let cart = [];
				const products = this.$store.state.products.products;
				const customPrice = this.$store.state.cart.customPrice;

				this.$store.state.cart.cart.forEach((i) => {
					if(cart.find((j) => j.id === i))
						cart[cart.indexOf(cart.find((j) => j.id === i))].count++;
					else
						cart.push({ ...products.find((j) => j.id === i), count: 1});
				});

				return cart.map((i) => {
					if(customPrice[i.id])
						return {...i, price: customPrice[i.id], isAuction: true};
					else
						return {...i, isAuction: false};
				});
			}
		},
	}
</script>
