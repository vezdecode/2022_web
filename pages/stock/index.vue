<template>
	<main class="flex flex-wrap gap-3 py-12 px-4">
		<product-card
			v-for="(i, index) in products"
			:key="index"
			:title="i.title"
			:price="i.price"
			:imageUrl="i.imageUrl.toString()"
			:id="i.id"
			:count="i.count"
			startLink="/stock/" />
	</main>
</template>
<script>
	export default {
		computed: {
			products () {
				let products = [];
				this.$store.state.globalCart.cart.forEach((i) => {
					const item = this.$store.state.products.products.find((j) => j.id === i);
					if(!products.find((j) => j.id === i)) {
						products.push({
							...item,
							count: item.count - 1,
						});
					}
					else
						products.find((j) => j.id === i).count--;
				});
				this.$store.state.products.products.forEach((i) => {
					if(!products.find((j) => j.id === i.id))
						products.push(i);
				});
				
				return products;
			}
		},
	}
</script>
