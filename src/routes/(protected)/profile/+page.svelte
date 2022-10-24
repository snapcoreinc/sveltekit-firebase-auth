<script lang="ts">
	import { session } from '$lib/auth/session';
</script>

<h1>Profile Page</h1>
You are logged in as {$session.user.name} ({$session.user.email})<br />
session:
<pre>{JSON.stringify($session, null, 2)}</pre>
