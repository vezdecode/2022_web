<template>
	<div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
		<a
			:href="startLink + id"
			class="w-full block h-full"
			draggable="true"
			@dragstart="onDrag($event, id)"
			@drop="onDrop($event, id)"
			@dragover.prevent
			@dragenter.prevent
		>
			<img alt="product photo" :src="imageUrl" class="max-h-40 w-full object-cover" draggable="false"/>
			<div class="bg-white w-full p-4">
				<p class="text-indigo-500 text-md font-medium">
					{{ title }}
				</p>
				<p class="text-gray-800 text-xl font-medium mb-2">
					{{ price }} $
				</p>
				<p class="text-gray-800 text-xl font-medium mb-2">
					{{ count === 0 ? 'Нет в наличии' : count + ' шт. в наличии'}}
				</p>
			</div>
		</a>
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
		},
		startLink: {
			type: String,
			required: true,
		},
	},
	methods: {
		onDrag(event, itemId) {
			event.dataTransfer.setData('itemId', itemId);
		},
		onDrop(event, itemId) {
			this.$store.commit('dnd/moveCard', [event.dataTransfer.getData('itemId'), itemId]);
		}
	}
}
</script>