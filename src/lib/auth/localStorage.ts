// accessors to interact with the local storage

export function saveRedirectURLInLocalStorage(url: string) {
	localStorage.setItem('redirectURL', url);
}

export function retrieveRedirectURLFromLocalStorage(): string {
	const str = localStorage.getItem('redirectURL');
	return str ? str : '/';
}

export function saveSignInDataInLocalStorage(email: string) {
	localStorage.setItem('email', email);
}
export function retrieveSignInDataFromLocalStorage(): string {
	const str = localStorage.getItem('email');
	return str ? str : '';
}
export function clearSignInDataFromLocalStorage() {
	localStorage.removeItem('email');
}
