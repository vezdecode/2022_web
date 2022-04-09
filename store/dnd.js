export const state = () => ({
	cardsPositions: [],
});

export const mutations = {
	setCards (state, cards) {
		state.cardsPositions = cards;
	},
	moveCard (state, cardsIds) {
		if(state.cardsPositions.indexOf(+cardsIds[1]) < state.cardsPositions.indexOf(+cardsIds[0])) {
			state.cardsPositions.splice(state.cardsPositions.indexOf(+cardsIds[0]), 1);
			state.cardsPositions = [
				...state.cardsPositions.slice(0, state.cardsPositions.indexOf(+cardsIds[1])),
				+cardsIds[0],
				...state.cardsPositions.slice(state.cardsPositions.indexOf(+cardsIds[1])),
			];
		}
		else {
			state.cardsPositions.splice(state.cardsPositions.indexOf(+cardsIds[0]), 1);
			state.cardsPositions = [
				...state.cardsPositions.slice(0, state.cardsPositions.indexOf(+cardsIds[1]) + 1),
				+cardsIds[0],
				...state.cardsPositions.slice(state.cardsPositions.indexOf(+cardsIds[1]) + 1),
			];
		}
		localStorage.setItem('cards_pos', JSON.stringify(state.cardsPositions));
	},
};
