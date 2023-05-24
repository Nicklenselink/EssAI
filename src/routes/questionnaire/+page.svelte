<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: any;

	let questionnaire = [
		{
			under: 2,
			strweak: 2,
			specific: 2,
			improve: 2,
			confident: 2,
			practice: 2,
			well: 2,
			futimprove: 2,
			clear: 2,
			overall: 2,
			personalised: '',
			errors: '',
			comments: '',
		},
		{
			under: 2,
			strweak: 2,
			specific: 2,
			improve: 2,
			confident: 2,
			practice: 2,
			well: 2,
			futimprove: 2,
			clear: 2,
			overall: 2,
			personalised: '',
			errors: '',
			comments: '',
		},
		{
			under: 2,
			strweak: 2,
			specific: 2,
			improve: 2,
			confident: 2,
			practice: 2,
			well: 2,
			futimprove: 2,
			clear: 2,
			overall: 2,
			personalised: '',
			errors: '',
			comments: '',
		},
		{
			under: 2,
			strweak: 2,
			specific: 2,
			improve: 2,
			confident: 2,
			practice: 2,
			well: 2,
			futimprove: 2,
			clear: 2,
			overall: 2,
			personalised: '',
			errors: '',
			comments: '',
		},
	];

	function submitQuestionnaire(answers: any) {
		fetch('api/questionnaire', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				answers,
			}),
		}).then(() => {
			alert('Your answers have been submitted. Thank you for participating!');
		});
	}
</script>

<div>
	<div class="flex flex-col gap-4 items-center">
		<div class="w-1/2 rounded pt-4">
			<h class="text-xl font-bold">Assessment of Feedback</h>
			<br />
			<p>
				Kindly read through the following questions about the received feedback carefully and rate
				your answers on a scale from "strongly disagree" to 'strongly agree'.
			</p>
		</div>
		{#each data.feedback as feedback, counter}
			<div class="w-1/2 rounded mb-4">
				<div class="py-5">
					<p class="text-xl">You got the following feedback:</p>
					<p class="whitespace-pre-wrap">{feedback.feedback}</p>
					<br />
					<p class="font-bold">Please answer the following questions regarding the feedback:</p>
				</div>

				<div class="mb-8">
					<p>
						I found the feedback provided by the application useful in improving my understanding of
						the essay content.
					</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].under}
						class="range"
						step="1"
					/>
					<div class="w-half flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>The feedback helped me identify strengths and weaknesses in your essay</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].strweak}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>The feedback was effective in providing specific suggestions for improvement.</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].specific}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>The feedback was valuable in helping me learn how to improve my writing skills.</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].improve}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>The feedback helped me feel more confident in your writing abilities.</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].confident}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>
						The feedback was helpful in identifying areas where I need more practice or guidance.
					</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].practice}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>The feedback helped me understand what I did well in my essay.</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].well}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>
						The feedback was useful in highlighting areas where I need to focus more attention in
						future essays.
					</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].futimprove}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>I found the feedback provided by the application clear and easy to understand.</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].clear}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>Overall, the feedback was helpful in improving my essay writing skills.</p>
					<input
						type="range"
						min="0"
						max="4"
						bind:value={questionnaire[counter].overall}
						class="range"
						step="1"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>Strongly disagree</span>
						<span>Disagree</span>
						<span>Neutral</span>
						<span>Agree</span>
						<span>Strongly agree</span>
					</div>
				</div>
				<div class="mb-8">
					<p>Did you find the feedback personalised to your essay?</p>
					<textarea
						class="textarea textarea-bordered w-full"
						bind:value={questionnaire[counter].personalised}
					/>
				</div>
				<div class="mb-8">
					<p>Did you notice any errors in the feedback?</p>
					<textarea
						class="textarea textarea-bordered w-full"
						bind:value={questionnaire[counter].errors}
					/>
				</div>
				<div class="mb-8">
					<p>Do you have any further comments?</p>
					<textarea
						class="textarea textarea-bordered w-full"
						bind:value={questionnaire[counter].comments}
					/>
				</div>
			</div>
		{/each}

		<button class="btn" on:click={() => submitQuestionnaire(questionnaire)}>Submit answers</button>
	</div>
</div>
