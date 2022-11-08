import type { RequestHandler } from './$types';
import { auth } from '$lib/server/admin';
import { json } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { Session } from '$lib/auth/types';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const WEEK_IN_MILLISECONDS = WEEK_IN_SECONDS * 1000;

// POST receives the client-side auth token, validates it and sets a cookie for future server-requests
// receive body(text),
export const POST: RequestHandler = async ({ request, cookies }) => {
	const token = await request.text();

	console.log('POST received token:' + token);

	const user = await auth.verifyIdToken(token);

	const sessionCookie = await auth.createSessionCookie(token, {
		expiresIn: WEEK_IN_MILLISECONDS
	});
	cookies.set('session', sessionCookie, {
		maxAge: WEEK_IN_SECONDS,
		httpOnly: true,
		secure: true,
		path: '/',
		sameSite: 'lax'
	});
	return json(getSession(user));
};

// DELETE clears the session cookie
export const DELETE: RequestHandler = async ({ cookies }) => {
	console.log('DELETE received');
	cookies.delete('session', {
		maxAge: WEEK_IN_SECONDS,
		httpOnly: true,
		secure: true,
		path: '/',
		sameSite: 'lax'
	});
	return json(getSession(null));
};

export function getSession(user: DecodedIdToken | null): Session {
	if (user) {
		const { name, email, email_verified, uid } = user;
		return {
			user: { name, email: email!, email_verified: email_verified!, uid }
		};
	}
	return { user };
}
