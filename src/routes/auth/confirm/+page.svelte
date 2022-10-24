<script lang="ts">
	import { page } from '$app/stores';
	import { auth } from '$lib/auth/auth';
	import { onMount } from 'svelte';
	import { session } from '$lib/auth/session';
	import { goto } from '$app/navigation';
	import type { State } from '$lib/auth/types';
	import { retrieveRedirectURLFromLocalStorage as retreiveRedirectURLFromLocalStorage } from '$lib/auth/localStorage';

	let email: string | '';
	let state: State = 'validating';

	// this function calls a server side api which trades the magiclink for a (httpOnly) session cookie
	async function callSignInWithFirebase(theemail?: string) {
		state = 'validating';
		try {
			state = await auth.confirmSignInWithEmail($page.url, theemail);
		} catch (error) {
			console.log(error);
			state = error as Error;
		}
	}

	onMount(async () => {
		session.subscribe((e) => {
			console.log(e);
			if (e.user) goto(retreiveRedirectURLFromLocalStorage(), { invalidateAll: true });
		});

		await callSignInWithFirebase();
	});

	// called when we need to capture email from a different device
	async function handleSubmit() {
		state = 'submitting';
		await callSignInWithFirebase(email);
	}
</script>

{#if state instanceof Error}
	<p>Error</p>
	<p>{state.message}</p>
{:else if state === 'validating'}
	<p>Signing in... Please wait</p>
{:else if state === 'submitting'}
	<p>Signing in...</p>
	<p>Welcome {email}</p>
{:else}
	<h1>Email Confirmation</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<p>It looks like you are sign-in from a different device...</p>
		<p>Please confirm the email used to sign-in</p>
		<div>
			<label for="email">Email</label>
			<input id="email" type="email" required bind:value={email} />
		</div>
		<button type="submit">Log in</button>
	</form>
{/if}
