<script lang="ts">
	import { session } from '$lib/auth/session';
	import SignInWithGoogle from '$lib/auth/SignInWithGoogle.svelte';
	import SignInWithEmail from '$lib/auth/SignInWithEmail.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		if ($session.user) {
			goto('/profile');
		}
	});
</script>

{#if $session.user}
	<h1>Profile Page</h1>
	You are logged in as {$session.user.name} ({$session.user.email})
{:else}
	<nav>
		<SignInWithGoogle />
		<SignInWithEmail />
	</nav>

	<main>
		<slot />
	</main>
{/if}

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
