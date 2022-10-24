import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { dev } from '$app/environment';

import { PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_AUTH_EMULATOR_HOST } from '$env/static/public';
import { FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY } from '$env/static/private';

if (dev && PUBLIC_FIREBASE_AUTH_EMULATOR_HOST?.length === 0)
	console.error('Please define PUBLIC_FIREBASE_AUTH_EMULATOR_HOST in Development');

// this is the server-side firebase client
const app = initializeApp({
	credential: cert({
		privateKey: FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL
	})
});
export const auth = getAuth(app);
