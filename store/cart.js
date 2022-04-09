export const state = () => ({
	cart: [],
	customPrice: {},
});

export const mutations = {
	setCart (state, cart) {
		state.cart = cart;
	},
	addProduct (state, productId) {
		state.cart.push(productId);
		sessionStorage.setItem('cart', JSON.stringify(state.cart));
	},
	removeProduct (state, productId) {
		state.cart.splice(state.cart.indexOf(productId), 1);
		sessionStorage.setItem('cart', JSON.stringify(state.cart));
	},
	removeAllProduct(state, productId) {
		while(state.cart.includes(productId))
			state.cart.splice(state.cart.indexOf(productId), 1);
		sessionStorage.setItem('cart', JSON.stringify(state.cart));
	},
	setCustomPrices(state, prices) {
		state.customPrice = prices;
		sessionStorage.setItem('custom_price', JSON.stringify({}));
	},
	setCustomPrice(state, params) {
		state.customPrice[params.id] = params.price;
		sessionStorage.setItem('custom_price', JSON.stringify(state.customPrice));
	}
};
