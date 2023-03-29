<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<div class="navbar bg-base-100 shadow-md">
	<div class="navbar-start" />
	<div class="navbar-center">
		<a href="/" class="btn btn-ghost normal-case text-xl">FAUNA</a>
	</div>
	<div class="navbar-end">
		<span class="mr-4">Welcome {$page.data.session?.user?.name}!</span>
		<div class="tooltip tooltip-bottom" data-tip="Sign out">
			<button on:click={() => signOut()} class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>
