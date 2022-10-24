<script lang="ts">
	import { auth } from './auth';
	import { page } from '$app/stores';

	let sent = false;
	let email = 'noone@noone.no';

	async function onSubmit() {
		const confirmtUrl = $page.url.href.replace(/\/([a-zA-Z]*)$/gm, '/confirm');
		try {
			await auth.signInWithEmail(email, confirmtUrl);
			sent = true;
		} catch (error) {
			alert(error);
		}
	}
</script>

{#if sent}
	<p>
		Email sent, please check your inbox. If you use the Emulator, the confirmation URL should be on
		the console.
	</p>
{:else}
	<form on:submit|preventDefault={onSubmit}>
		<input id="email" type="email" required bind:value={email} placeholder="email" />
		<button type="submit">Sign In With Email</button>
	</form>
{/if}
