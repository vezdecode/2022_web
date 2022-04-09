export const state = () => ({
	auctions: {},
	myAuctions: {},
});

export const mutations = {
	setAuctions (state, auctions) {
		Object.keys(auctions).forEach((i) => {
			state.auctions[i] = auctions[i];
		});

		console.log(state.auctions);
	},
	setMyAuctions (state, auctions) {
		state.myAuctions = auctions;
	},
	createAuction (state, props) {
		state.auctions[props.itemId] = {
			prices: [props.startPrice],
			endTime: Date.now() + 120000,
		};
		state.myAuctions[props.itemId] = props.startPrice;

		localStorage.setItem('auctions', JSON.stringify(state.auctions));
		sessionStorage.setItem('my_auctions', JSON.stringify(state.myAuctions));
	},
	closeAuction (state, id) {
		state.auctions[id] = null;
		state.myAuctions[id] = null;

		localStorage.setItem('auctions', JSON.stringify(state.auctions));
		sessionStorage.setItem('my_auctions', JSON.stringify(state.myAuctions));
	},
	addPrice(state, params) {
		state.auctions[params.itemId].prices.push(params.price);
		state.myAuctions[params.itemId] = params.price;

		localStorage.setItem('auctions', JSON.stringify(state.auctions));
		sessionStorage.setItem('my_auctions', JSON.stringify(state.myAuctions));
	}
};
