<template>
	<section class="text-gray-600 body-font overflow-hidden">
		<modal-price :minPrice="activeAuction ? activeAuction.prices.sort()[activeAuction.prices.length - 1] : 0" />
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
				<div class="flex">
					<span class="title-font font-medium text-2xl text-gray-900">
						{{ product.isAuction ? 'Аукцион' : product.price + ' $' }}
					</span>
					<button
						:class="'flex ml-auto border-0 py-2 px-6 focus:outline-none rounded ' + (inCart || product.count === 0 || myAuction  ? 'text-gray-600 bg-gray-100 hover:bg-gray-200' : 'text-white bg-indigo-500 hover:bg-indigo-600')"
						@click="onClick(product.count, inCart, product.isAuction, myAuction)"
					>
						{{ getTitle(product.count, inCart, product.isAuction, myAuction) }}
					</button>
				</div>
				<div :class="'flex-col text-center w-full mt-14 mb-20 ' + (activeAuction ? 'flex' : 'hidden')">
					<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						Аукцион уже идёт!
					</h1>
					<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
						Последняя ставка: {{ activeAuction && activeAuction.prices.sort()[activeAuction.prices.length - 1] }} $
					</p>
					<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
						Ваша ставка: {{ myAuction && myAuction }} $
					</p>
					<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
						До окончания: {{ activeAuction && formatTime(leftTime) }}
					</p>
					{{runTimer()}}
				</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				maxPrice: 0,
				leftTime: 0,
			};
		},
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
			inCart () {
				const _id = this.$route.params.id;
				return this.$store.state.cart.cart.includes(+_id);
			},
			activeAuction () {
				const _id = this.$route.params.id;
				const _auctions = this.$store.state.auction.auctions;

				return _auctions[_id];
			},
			myAuction () {
				const _id = this.$route.params.id;
				const _auctions = this.$store.state.auction.myAuctions;

				return _auctions[_id];
			}
		},
		methods: {
			addToCart() {
				const _id = this.$route.params.id;
				this.$store.commit('cart/addProduct', +_id);
				this.$store.commit('globalCart/addProduct', +_id);
			},
			removeFromCart() {
				const _id = this.$route.params.id;
				this.$store.commit('cart/removeProduct', +_id);
				this.$store.commit('globalCart/removeProduct', +_id);
			},
			getTitle(count, inCart, isAuction, myAuctions) {
				if(inCart)
					return 'Уже в корзине';
				else if(count === 0)
					return 'Нет в наличии';
				else if(myAuctions)
					return 'Вы участвуете';
				else if(isAuction)
					return 'Предложить цену';
				else
					return 'Добавить в корзину';
			},
			onClick(count, inCart, isAuction, myAuction) {
				if(inCart)
					this.removeFromCart();
				else if(count !== 0 && isAuction && !myAuction)
					this.$store.commit('modal/toggleModal');
				else if(count !== 0 && !isAuction)
					this.addToCart();
			},
			runTimer() {
				const auction = this.$store.state.auction.auctions[this.$route.params.id];

				if(auction) {
					const _prices = this.$store.state.auction.auctions[this.$route.params.id].prices;
					this.maxPrice = _prices.sort()[_prices.length - 1];

					const timeout = setTimeout(() => {
						const _id = this.$route.params.id;
						const _auctions = this.$store.state.auction.auctions;

						const _prices = this.$store.state.auction.auctions[this.$route.params.id].prices;

						const diff = _auctions[_id].endTime - Date.now();
						this.leftTime = diff;

						if(diff > 0)
							timeout();
						else {
							const _my = this.$store.state.auction.myAuctions[this.$route.params.id];
							if(auction.prices.sort()[auction.prices.length - 1] === _my) {
								this.addToCart();
								this.$store.commit('cart/setCustomPrice', {
									id: +_id,
									price: _my,
								});
							}

							this.$store.commit('auction/closeAuction', this.$route.params.id);
							window.location.reload();
						}
					}, 1000);
				}
			},
			formatTime(diff) {
				const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
				const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

				return `${minutes} мин. ${seconds} сек.`;
			} 
		}
	}
</script>
