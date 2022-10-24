export interface Session {
	user: {
		name: string;
		email: string;
		email_verified: boolean;
		uid: string;
	} | null;
}

//TODO rename FormState
export type State = 'validating' | 'idle' | 'submitting' | Error;
