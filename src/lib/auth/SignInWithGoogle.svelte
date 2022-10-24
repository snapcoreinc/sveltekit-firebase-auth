<script lang="ts">
	import { auth } from './auth';
</script>

<button on:click={() => auth.signInWith('google')}>Sign In with Google</button>
