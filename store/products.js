export const state = () => ({
	products: null
});

export const mutations = {
	setProducts (state, products) {
		state.products = products;
	},
	updateProduct (state, updatedProduct) {
		const index = state.products.indexOf(state.products.find((i) => i.id === +updatedProduct.id));
		state.products[index].title = updatedProduct.title;
		state.products[index].description = updatedProduct.description;
		state.products[index].imageUrl = updatedProduct.imageUrl;
		state.products[index].price = +updatedProduct.price;
		state.products[index].count = +updatedProduct.count;
		state.products[index].isAuction = !!updatedProduct.isAuction;

		localStorage.setItem('products', JSON.stringify(state.products));
	}
};
