import { browser, dev } from '$app/environment';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { derived, type Readable } from 'svelte/store';
import { app } from './FirebaseApp';
import { retrieveSignInDataFromLocalStorage, saveSignInDataInLocalStorage } from './localStorage';
import type { State } from './types';
import { PUBLIC_FIREBASE_AUTH_EMULATOR_HOST } from '$env/static/public';

const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// load the firebase auth client as a store and provide an API to access its methods
// this depends on the app store and will also only be loaded on demand
// so no firebase JS loaded unless the page needs it
const createAuth = () => {
	let auth: Auth;

	const { subscribe } = derived<Readable<FirebaseApp>, Auth>(app, ($app, set) => {
		async function init() {
			if ($app && !auth) {
				const { getAuth, connectAuthEmulator } = await import('firebase/auth');
				auth = getAuth($app);
				if (dev) {
					connectAuthEmulator(auth, PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
				}
				set(auth);
			}
		}

		if (browser) init();
	});

	async function providerFor(name: string) {
		const { GoogleAuthProvider } = await import('firebase/auth');
		switch (name) {
			case 'google':
				return new GoogleAuthProvider();
			default:
				throw 'unknown provider ' + name;
		}
	}

	async function signInWith(name: string) {
		const { signInWithRedirect } = await import('firebase/auth');
		const provider = await providerFor(name);
		await signInWithRedirect(auth, provider);
	}

	async function signInWithEmail(email: string, redirectUrl: string) {
		const { sendSignInLinkToEmail } = await import('firebase/auth');

		if (emailRegex.test(email)) {
			await sendSignInLinkToEmail(auth, email, {
				url: redirectUrl,
				handleCodeInApp: true
			});

			saveSignInDataInLocalStorage(email);
		} else {
			throw new Error('Invalid email');
		}
	}

	async function confirmSignInWithEmail(magicLink: URL, theEmail?: string): Promise<State> {
		const { isSignInWithEmailLink, signInWithEmailLink } = await import('firebase/auth');

		// with no delay, you will likely get a "tenantId not found error" from the Firebase SDK
		await sleep(4000);
		if (isSignInWithEmailLink(auth, magicLink.href)) {
			if (!theEmail || theEmail.trim().length === 0) {
				const email = retrieveSignInDataFromLocalStorage();
				console.log('localStorage.email', email);
				theEmail = email;
			}
			if (emailRegex.test(theEmail) && theEmail.trim().length > 0) {
				const userCredentails = await signInWithEmailLink(auth, theEmail, magicLink.href);
				console.log('userCredentails', userCredentails);
				// The session cookie is set via a call to server side session - but this is done via a call back on firebase auth
				return 'validating';
			} else {
				return 'idle';
			}
		} else {
			throw new Error('Invalid magicLink');
		}
	}

	async function signOut() {
		const { signOut } = await import('firebase/auth');
		await signOut(auth);
	}

	return {
		subscribe,
		signInWithEmail,
		confirmSignInWithEmail,
		signInWith,
		signOut
	};
};

export const auth = createAuth();
