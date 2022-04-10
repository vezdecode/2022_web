<template>
	<div class="flex justify-between items-center mt-6 pt-6">
		<div class="flex items-center">
			<img :src="imageUrl" width="60" class="rounded-full ">
			<div class="flex flex-col ml-3">
				<span class="md:text-md font-medium">
					{{ title }}
				</span>
			</div>
		</div>
		<div class="flex justify-center items-center">
			<div class="pr-8 flex ">
				<button @click="removeProduct(id)" :class="'font-semibold ' + (isAuction && 'hidden')">
					-
				</button>
				<p class="bg-gray-100 border h-6 w-8 rounded text-center text-sm px-2 mx-2">
					{{ count }}
				</p>
				<button @click="addProduct(id)" :class="'font-semibold ' + (isAuction && 'hidden')">
					+
				</button>
			</div>
			<div class="pr-8 ">
				<span class="text-xs font-medium">
					{{ isAuction ? 'Аукцион' : '' }} {{ price * count }} $
				</span>
			</div>
			<div class="pr-8 ">
				<button
					class="flex text-white bg-red-500 border-0 py-1 px-4 hover:bg-red-600 focus:outline-none rounded"
					@click="removeAllProduct(id, count)"
				>
					Удалить
				</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			id: Number,
			imageUrl: String,
			title: String,
			price: Number,
			count: Number,
			isAuction: Boolean,
		},
		methods: {
			addProduct (productId) {
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

				if(products.find((i) => i.id === productId).count > 0) {
					this.$store.commit('cart/addProduct', productId);
					this.$store.commit('globalCart/addProduct', +productId);
				}
			},
			removeProduct (productId) {
				this.$store.commit('cart/removeProduct', productId);
				this.$store.commit('globalCart/removeProduct', +productId);
				this.$store.commit('cart/setCustomPrice', {
					id: productId,
					price: null,
				});
			},
			removeAllProduct(productId, count) {
				this.$store.commit('cart/removeAllProduct', productId);
				this.$store.commit('cart/setCustomPrices');
				
				for(let i = 0; i < count; i++)
					this.$store.commit('globalCart/removeProduct', +productId);
			}
		}
	}
</script>
