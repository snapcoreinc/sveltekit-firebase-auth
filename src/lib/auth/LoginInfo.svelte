<script lang="ts">
	import { auth } from '$lib/auth/auth';
	import { session } from '$lib/auth/session';
</script>

{#if $session.user}
	{$session.user.email}
	<button on:click={() => auth.signOut()}>Sign Out</button>
{:else}
	<a href="/auth/login">Sign In</a>
{/if}
