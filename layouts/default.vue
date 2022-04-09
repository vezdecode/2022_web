<template>
	<div id="app" class="relative">
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

			if(sessionStorage.getItem('custom_price'))
				this.$store.commit('cart/setCustomPrices', JSON.parse(sessionStorage.getItem('custom_price')));

			if(localStorage.getItem('global_cart'))
				this.$store.commit('globalCart/setCart', JSON.parse(localStorage.getItem('global_cart')));
			else
				localStorage.setItem('global_cart', '[]');

			if(localStorage.getItem('cards_pos'))
				this.$store.commit('dnd/setCards', JSON.parse(localStorage.getItem('cards_pos')));
			else {
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

				this.$store.commit('dnd/setCards', products.map((i) => i.id));

				localStorage.setItem('cards_pos', JSON.stringify(products.map((i) => i.id)));
			}

			if(localStorage.getItem('auctions'))
				this.$store.commit('auction/setAuctions', JSON.parse(localStorage.getItem('auctions')));
			if(sessionStorage.getItem('my_auctions'))
				this.$store.commit('auction/setMyAuctions', JSON.parse(sessionStorage.getItem('my_auctions')));
		}
	},
}
</script>
