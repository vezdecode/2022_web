<template>
	<header class="bg-white text-gray-600 body-font sticky top-0">
		<div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
			<nuxt-link to="/">
				<a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<img src="~/assets/icons/vk.svg" alt='vk logo' />
					<span class="ml-3 text-xl">VK Shop</span>
				</a>
			</nuxt-link>
			<nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
				<nuxt-link to="/products">
					<a class="mr-5 hover:text-gray-900">
						Ассортимент
					</a>
				</nuxt-link>
			</nav>
			<nuxt-link to="/cart">
				<button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
					В корзину
					<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
						<path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</button>
			</nuxt-link>
		</div>
	</header>
</template>