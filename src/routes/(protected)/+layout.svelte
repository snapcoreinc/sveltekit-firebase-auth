<script lang="ts">
	import { saveRedirectURLInLocalStorage } from '$lib/auth/localStorage';
	import { session } from '$lib/auth/session';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (!$session.user) {
			saveRedirectURLInLocalStorage($page.url.href);
			goto('/auth/login');
		}
	});
</script>

{#if $session.user}
	<slot />
{:else}
	This content is protected
{/if}
