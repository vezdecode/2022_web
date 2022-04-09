export const state = () => ({
	cart: [],
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
	}
};
