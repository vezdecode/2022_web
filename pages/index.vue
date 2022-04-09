<template>
	<main class="flex flex-wrap gap-3 pt-12 px-4">
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
import data from '~/static/products.json';

export default {
	asyncData ({ params }) {
    	return {
			products: data.products
		};
  	}
}
</script>
