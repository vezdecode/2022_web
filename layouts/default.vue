<template>
	<div id="app">
		<app-header/>
		<nuxt/>
	</div>
</template>
<script>
import data from '~/static/products.json';
	
export default {
	created() {
		if(!this.$store.state.products.products)
			this.$store.commit('products/setProducts', data.products);

		if (typeof window !== 'undefined') {
			if(sessionStorage.getItem('products') && sessionStorage.getItem('products') !== JSON.stringify(data.products))
				this.$store.commit('products/setProducts', JSON.parse(sessionStorage.getItem('products')));
			else
				sessionStorage.setItem('products', JSON.stringify(data.products));

			if(sessionStorage.getItem('cart'))
				this.$store.commit('cart/setCart', JSON.parse(sessionStorage.getItem('cart')));
			else
				sessionStorage.setItem('cart', '[]');
		}
	},
}
</script>
