<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
		<router-link
			v-for="link in links"
			:key="link.url"
			tag="li"
			active-class="active"
			:to="link.url"
			:exact="link.exact"
		>
			<a class="waves-effect waves-orange pointer">{{ link.title }}</a>
		</router-link>
	</ul>
</template>
<!-- exact - режима точного соответствия на пееходимую страницу -->
<script>
export default {
	data: () =>({
		links: [
			{title: 'Счет',  url: '/', exact: true},
			{title: 'История',  url: '/history'},
			{title: 'Планирование',  url: '/planning'},
			{title: 'Новая запись',  url: '/record'},
			{title: 'Категории',  url: '/categories'}
		]
	}),
	props: ['isOpen']
}
</script>