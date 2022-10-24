<script lang="ts">
	import LoginInfo from '$lib/auth/LoginInfo.svelte';
</script>

<nav>
	<a href="/">Home</a> |
	<a href="/page1">Protected Page</a> |
	<a href="/page2">UnProtected Page</a> |
	<a href="/profile"><LoginInfo /></a>
</nav>

<main>
	<slot />
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	nav,
	main {
		padding: 1em;
	}
</style>
