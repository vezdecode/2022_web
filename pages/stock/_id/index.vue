<template>
	<section class="text-gray-600 body-font overflow-hidden">
		<div class="container px-5 py-24 mx-auto">
			<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="product.imageUrl">
			<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<h1 class="text-gray-900 text-3xl title-font font-medium mb-3">
					{{ product.title }}
				</h1>
				<p class="leading-relaxed">
					{{ product.description }}
				</p>
				<p class="leading-relaxed text-xl mt-4 text-gray-900">
					{{ product.count === 0 ? 'Нет в наличии' : product.count + ' шт. в наличии'}}
				</p>
				<div class="flex items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
				<div class="flex justify-between">
					<span class="title-font font-medium text-2xl text-gray-900">
						{{ product.price }} $
					</span>
					<nuxt-link :to="'/stock/' + product.id + '/edit'">
						<button class="flex text-white bg-indigo-500 hover:bg-indigo-600 border-0 py-2 px-6 focus:outline-none rounded">
							Изменить
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
		computed: {
			product () {
				const _id = this.$route.params.id;

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
				this.$store.state.products.products.forEach((i) => {
					if(!products.find((j) => j.id === i.id))
						products.push(i);
				});

				return products.find((i) => i.id === +_id);
			},
		},
	}
</script>
