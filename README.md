# firebase-auth-boilerplate

This project is an example to show Firebase auth used on the client and accessed via a Svelte Store.

- Client-Server sync of session via a HttpOnly cookie
- Demonstrates using Firebase auth as an IAM
- Authentication using Google & Email
- Asynchronous loading of the profile
- Lazy loading of Firebase 9.0 SDK
- Proper handling of authentication when linking to a protected pages
- Use of the Firebase emulator for local testing

The auth store ensures that the firebase code is only loaded and called when the page is running in the browser and when the auth status has been referenced. Comment out the `<Auth />` import in `$layout.svelte` and notice that no firebase libs are requested.

## Roadmap

Some additional pieces I'll try to add:

- auth guards to prevent routes rendering or to show an "access denied" message based on auth status
- role-based UI customization where elements are shown or hidden based on auth claims (e.g. hide an "edit" button if the user doesn't have "author" permissions)
- how to use SvelteKit stores with Firestore to simplify querying / subscribing to data
- how to use Firestore with SSR and SPA mode working efficiently (transparent hand-off of SSR data to a client-side subscription for live updates)

## Startup

### Install the Firebase CLI

```bash
$ pnpm i -g firebase-tools
$ firebase login
$ firebase projects:list
```

### Get parameters from FireBase Console

edit `.env` and fill the missing data

### Start the Firebase Emulator

```shell
$ pnpm emulators:start &
```

### Start the app

```shell
$ pnpm dev
```
