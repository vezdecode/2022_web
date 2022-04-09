<template>
	<div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
		<a :href="'/products/' + id" class="w-full block h-full">
			<img alt="product photo" :src="imageUrl" class="max-h-40 w-full object-cover"/>
			<div class="bg-white w-full p-4">
				<p class="text-indigo-500 text-md font-medium">
					{{ title }}
				</p>
				<p class="text-gray-800 text-xl font-medium mb-2">
					{{ price }} $
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
	}
}
</script>