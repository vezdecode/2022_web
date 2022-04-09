<template>
	<main class="flex flex-wrap gap-3 py-12 px-4">
		<product-card
			v-for="(i, index) in products"
			:key="index"
			:title="i.title"
			:price="i.price"
			:imageUrl="i.imageUrl.toString()"
			:id="i.id" />
	</main>
</template>
<script>
	export default {
		computed: {
			products () {
				return this.$store.state.products.products;
			}
		},
	}
</script>
