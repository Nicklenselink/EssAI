<script lang="ts">
	import Quill from 'quill';
	import { onMount } from 'svelte';

	let editor: Element;
	let quill: Quill;

	onMount(() => {
		quill = new Quill(editor, {
			theme: 'snow',
			modules: {
				toolbar: [
					['bold', 'italic'],
					[{ header: 1 }, { header: 2 }],
				],
			},
		});
	});

	let messages: any[] = [];
	let loading = false;

	function feedback() {
		messages.push({ text: 'Give me some feedback!', side: 'end' });
		messages = messages;
		loading = true;
		const essay = quill.getText();
		const feedback = fetch('/api/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				essay,
			}),
		}).then(async (response) => {
			const { feedback } = await response.json();
			messages.push({ text: feedback, side: 'start' });
			messages = messages;
			loading = false;
		});
	}
</script>

<div class="container mx-auto h-5/6">
	<div class="flex flex-row h-full">
		<div class="basis-2/3 p-4 flex flex-col">
			<h1 class="text-2xl mb-2">Write your essay:</h1>
			<div bind:this={editor} class="flex-grow" />
		</div>
		<div class="basis-1/3 p-4 flex flex-col">
			<h1 class="text-2xl mb-2">Feedback:</h1>
			<div class="flex-grow flex flex-col">
				<div class="flex-grow border p-2 overflow-y-scroll">
					{#each messages as message}
						<div class="chat chat-{message.side}">
							<div class="chat-bubble whitespace-pre-line">{message.text}</div>
						</div>
					{/each}
					{#if loading}
						<div class="flex items-center justify-center">
							<div
								class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							>
								<span
									class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
									>Loading...</span
								>
							</div>
						</div>
					{/if}
				</div>
				<div class="pt-2 w-100 mx-auto">
					<button class="btn" on:click={feedback} disabled={loading}>Give me feedback</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
