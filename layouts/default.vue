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
			if(localStorage.getItem('products') && localStorage.getItem('products') !== JSON.stringify(data.products))
				this.$store.commit('products/setProducts', JSON.parse(localStorage.getItem('products')));
			else
				localStorage.setItem('products', JSON.stringify(data.products));

			if(sessionStorage.getItem('cart'))
				this.$store.commit('cart/setCart', JSON.parse(sessionStorage.getItem('cart')));
			else
				sessionStorage.setItem('cart', '[]');

			if(localStorage.getItem('global_cart'))
				this.$store.commit('globalCart/setCart', JSON.parse(localStorage.getItem('global_cart')));
			else
				localStorage.setItem('global_cart', '[]');
		}
	},
}
</script>
