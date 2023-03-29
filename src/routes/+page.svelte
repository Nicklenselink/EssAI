<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<h1>Welcome {$page.data.session?.user?.name}!</h1>
{#if $page.data.session}
	<button on:click={() => signOut()} class="btn">Sign out</button>
{/if}
