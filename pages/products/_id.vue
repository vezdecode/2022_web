<template>
	<section class="text-gray-600 body-font overflow-hidden">
		<div class="container px-5 py-24 mx-auto">
			<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="product.imageUrl">
			<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<h1 class="text-gray-900 text-3xl title-font font-medium mb-3">{{ product.title }}</h1>
				<p class="leading-relaxed">{{ product.description }}</p>
				<div class="flex mt-4 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
				<div class="flex">
					<span class="title-font font-medium text-2xl text-gray-900">{{ product.price }} $</span>
					<button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Добавить в корзину</button>
				</div>
			</div>
			</div>
		</div>
	</section>
</template>
<script>
import data from '~/static/products.json';

export default {
	asyncData ({ params }) {
    	return {
			product: data.products.find((i) => i.id === +params.id)
		};
  	}
}
</script>
