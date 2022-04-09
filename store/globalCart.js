export const state = () => ({
	cart: [],
});

export const mutations = {
	setCart (state, cart) {
		state.cart = cart;
	},
	addProduct (state, productId) {
		state.cart.push(productId);
		localStorage.setItem('global_cart', JSON.stringify(state.cart));
	},
	removeProduct (state, productId) {
		state.cart.splice(state.cart.indexOf(productId), 1);
		localStorage.setItem('global_cart', JSON.stringify(state.cart));
	},
};
