<template>
	<section class="text-gray-600 body-font overflow-hidden">
		<div class="container px-5 py-24 mx-auto">
			<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<div class="lg:w-1/2 w-full lg:h-auto h-68">
				<img alt="ecommerce" class="object-cover object-center rounded" :src="imageUrl">
				<input
					type="text"
					placeholder="Ссылка на изображение"
					v-model="imageUrl"
					class="w-full mt-4 bg-gray-100 mb-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">	
			</div>
			<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<input
					type="text"
					placeholder="Название товара"
					v-model="title"
					class="w-full bg-gray-100 mb-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
				<textarea
					type="text"
					rows="5"
					placeholder="Описание товара"
					v-model="description"
					class="w-full bg-gray-100 mb-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
				</textarea>
				<div class="flex mt-4 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
				<div class="flex justify-between h-fit">
					<div class="flex gap-2">
						<input
							type="number"
							placeholder="Цена"
							v-model="price"
							class="w-20 bg-gray-100 mb-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
						<span class="title-font font-medium text-2xl text-gray-900 mt-1">$</span>
					</div>
					<nuxt-link :to="'/products/' + productId">
						<button
							class="flex text-gray-600 bg-gray-100 border-0 py-2 px-6 hover:bg-gray-200 focus:outline-none rounded"
							@click="updateProduct({
								id: productId,
								title,
								description,
								imageUrl,
								price,
							})"
						>
							Сохранить
						</button>
					</nuxt-link>
				</div>
			</div>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			const _id = this.$route.params.id;
			return {
				title: this.$store.state.products.products.find((i) => i.id === +_id).title,
				description: this.$store.state.products.products.find((i) => i.id === +_id).description,
				price: this.$store.state.products.products.find((i) => i.id === +_id).price,
				imageUrl: this.$store.state.products.products.find((i) => i.id === +_id).imageUrl,
				productId: this.$route.params.id,
			};
		},
		methods: {
			updateProduct (updateProduct) {
				this.$store.commit('products/updateProduct', updateProduct)
			}
		}
	}
</script>
