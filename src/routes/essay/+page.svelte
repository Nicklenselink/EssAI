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
	let condition = Math.floor(Math.random() * 3);


	function feedback() {
		messages.push({ text: 'Give me some feedback!', type: 'request' });
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
				condition
			}),
		}).then(async (response) => {
			const { feedback, id } = await response.json();
			messages.push({
				text: feedback,
				id: id,
				type: 'feedback',
				helpful: undefined,
			});
			messages = messages;
			loading = false;
		});
	}

	function updateUserFeedback(message: any, helpful: boolean) {
		const user_feedback = fetch('api/user_feedback', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: message.id,
				helpful,
			}),
		});
		message.helpful = helpful;
		messages = messages;
	}
</script>

<div class="container mx-auto h-5/6">
	<div class="flex flex-row h-full">
		<div class="basis-2/3 p-4 flex flex-col position-fixed">
			<h1 class="text-2xl mb-2">Write your essay:</h1>
			<div bind:this={editor} class="flex-grow" />
		</div>
		<div class="basis-1/3 p-4 flex flex-col">
			<h1 class="text-2xl mb-2">Feedback:</h1>
			<div class="flex-grow flex flex-col">
				<div class="flex-grow border p-2">
					{#each messages as message}
						{#if message.type == 'feedback'}
							<div class="chat chat-start">
								<div class="chat-bubble whitespace-pre-wrap">{message.text}</div>
								<div class="chat-footer">
									<div class="tooltip tooltip-bottom" data-tip="Helpful">
										<button
											class="btn btn-circle {message.helpful != true ? 'btn-outline' : ''}"
											on:click={() => updateUserFeedback(message, true)}
										>
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
													d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
												/>
											</svg>
										</button>
									</div>

									<div class="tooltip tooltip-bottom" data-tip="Unhelpful">
										<button
											class="btn btn-circle {message.helpful != false ? 'btn-outline' : ''}"
											on:click={() => updateUserFeedback(message, false)}
										>
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
													d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						{:else}
							<div class="chat chat-end">
								<div class="chat-bubble whitespace-pre-wrap">{message.text}</div>
							</div>
						{/if}
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

<input type="checkbox" id="disclaimer-modal" class="modal-toggle" checked={true} />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Disclaimer</h3>
		<div class="py-4">
			<p>
				The essay feedback provided by EssAI is generated using GPT-4, an advanced language model
				developed by OpenAI. While the feedback generated by GPT-4 can be helpful in improving your
				essays, it is important to understand its limitations and use it responsibly.
			</p>
			<ol>
				<li>
					<strong>Machine-Generated Feedback:</strong> The feedback provided by GPT-4 is generated by
					a machine learning model and should be considered as an automated response. It does not reflect
					the opinions, expertise, or individual judgment of a human teacher or expert.
				</li>
				<li>
					<strong>Contextual Understanding:</strong> GPT-4 is designed to analyze and generate text based
					on patterns and examples from a wide range of data. While it strives to provide relevant and
					accurate feedback, it may not always fully understand the context, nuance, or specific requirements
					of your essay topic or assignment.
				</li>
				<li>
					<strong>Subjectivity and Bias:</strong> As an AI language model, GPT-4 learns from a vast amount
					of text data, which may include biased or subjective content. The generated feedback should
					be used as a starting point for your own critical thinking and should not be solely relied
					upon as the final evaluation or assessment of your essay.
				</li>
				<li>
					<strong>User Responsibility:</strong> The ultimate responsibility for the content, structure,
					and quality of your essay lies with you as the student. EssAI, including the feedback generated
					by GPT-4, should be treated as a tool to assist your writing process, but it is important to
					independently review, revise, and verify the suggestions provided.
				</li>
			</ol>
			<p class="py-4">
				By using EssAI and availing yourself of the essay feedback provided by GPT-4, you
				acknowledge and understand the above disclaimers. It is recommended that you consult with
				your teacher, professor, or any human experts available to you for additional guidance and
				evaluation of your essays.
			</p>
			<i>
				<strong>Note:</strong> This disclaimer itself was generated by ChatGPT, an application by OpenAI
				that uses GPT-3.5. However, this disclaimer was carefully checked for inaccuracies by actual
				human beings.
			</i>
		</div>
		<div class="modal-action">
			<label for="disclaimer-modal" class="btn">I have read the disclaimer</label>
		</div>
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
