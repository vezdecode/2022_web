<template>
	<aside :class="'absolute top-0 w-screen h-screen bg-[rgba(0,0,0,.3)] justify-center items-center ' + (showModal ? 'flex' : 'hidden')">
		<div class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
			<div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
				Предложите вашу цену
			</div>
			<div class="self-center mb-2 font-light text-gray-500 sm:text-xl">
				Минимальная стоимость: {{ minPrice + 1 }} $
			</div>
			<div class="p-6">
				<div class="flex flex-col mb-2">
					<input
						type="number"
						:min="minPrice"
						class="w-full bg-gray-100 mb-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						v-model="price"
						placeholder="Ваша стоимость"/>
				</div>
				<div class="w-full my-4">
					<button @click="submit(price, minPrice)" class="w-full ml-auto border-0 py-2 px-6 focus:outline-none rounded text-white bg-indigo-500 hover:bg-indigo-600">
						Предложить
					</button>
					<button @click="toggleModal()" class="w-full mt-3 border-0 py-2 px-6 focus:outline-none rounded text-white bg-red-500 hover:bg-red-600">
						Отмена
					</button>
				</div>
			</div>
		</div>
	</aside>
</template>
<script>
export default {
	props: {
		minPrice: Number,
	},
	computed: {
		showModal () {
			return this.$store.state.modal.showModal;
		},
	},
	data() {
		return {
			price: null,
		};
	},
	methods: {
		submit(price, minPrice) {
			if(price && price > minPrice && !this.$store.state.auction.auctions[this.$route.params.id]) {
				this.$store.commit('auction/createAuction', {
					itemId: this.$route.params.id,
					startPrice: +price,
				});
				this.$store.commit('modal/toggleModal');
				window.location.reload();
			}
			else if(price && price > minPrice) {
				this.$store.commit('auction/addPrice', {
					itemId: this.$route.params.id,
					price: +price,
				});
				this.$store.commit('modal/toggleModal');
				window.location.reload();
			}
		},
		toggleModal() {
			this.$store.commit('modal/toggleModal');
		}
	}
};
</script>
