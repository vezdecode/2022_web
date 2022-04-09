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
				<button @click="removeProduct(id)" class="font-semibold">
					-
				</button>
				<p class="bg-gray-100 border h-6 w-8 rounded text-center text-sm px-2 mx-2">
					{{ count }}
				</p>
				<button @click="addProduct(id)" class="font-semibold">
					+
				</button>
			</div>
			<div class="pr-8 ">
				<span class="text-xs font-medium">
					{{ price * count }} $
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
			id: {
				type: Number,
				required: true,
			},
			imageUrl: {
				type: String,
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			count: {
				type: Number,
				required: true,
			}
		},
		methods: {
			addProduct (productId) {
				this.$store.commit('cart/addProduct', productId)
				this.$store.commit('globalCart/addProduct', +productId);
			},
			removeProduct (productId) {
				this.$store.commit('cart/removeProduct', productId)
				this.$store.commit('globalCart/removeProduct', +productId);
			},
			removeAllProduct(productId, count) {
				this.$store.commit('cart/removeAllProduct', productId)
				for(let i = 0; i < count; i++)
					this.$store.commit('globalCart/removeProduct', +productId);
			}
		}
	}
</script>
