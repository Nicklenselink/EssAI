<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: any;
	let understand_content = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
	let isModalOpen = false;
	let questionaire = [
		{
			under: 50,
			strweak: 50,
			specific: 50,
			improve: 50,
			confident: 50,
			practice: 50,
			well: 50,
			futimprove: 50,
			clear: 50,
			Overall: 50,
		},
		{
			under: 50,
			strweak: 50,
			specific: 50,
			improve: 50,
			confident: 50,
			practice: 50,
			well: 50,
			futimprove: 50,
			clear: 50,
			Overall: 50,
		},
		{
			under: 50,
			strweak: 50,
			specific: 50,
			improve: 50,
			confident: 50,
			practice: 50,
			well: 50,
			futimprove: 50,
			clear: 50,
			Overall: 50,
		},
		{
			under: 50,
			strweak: 50,
			specific: 50,
			improve: 50,
			confident: 50,
			practice: 50,
			well: 50,
			futimprove: 50,
			clear: 50,
			Overall: 50,
		},
	];

	function storeQuestionaire(answers: any) {
		const questionaire = fetch('api/questionnaire', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: data.user.id,
				answers,
			}),
		});
		alert('thanks for filling out the questionnaire!');
	}
</script>

<div>
	<div class="flex flex-col gap-4 items-center">
		<div class="w-1/2 rounded">
			<h>Assessment of Feedback</h>
			<br />
			<p>
				Kindly read through the following questions about the recieved feedback carefully and rate
				your answers on a scale of 1-5, with 1 being "not at all useful" and 5 being "extremely
				useful".
			</p>
		</div>
		{#each data.feedback as feedback, counter}
			<div class="felx flex-col gap-4 w-1/2 rounded">
				<div class="py-5">
					<p>This was youre feedback:</p>
					<p>{feedback.feedback}</p>
					<br />
					<p>Pleas answer the following questions regarding the feedback.</p>
				</div>

				<div>
					<p>
						How useful was the feedback provided by the application in improving your understanding
						of the essay's content?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].under}
						class="range"
						step="25"
					/>
					<div class="w-half flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>
				<div>
					<p>
						To what extent did the feedback help you identify strengths and weaknesses in your
						essay?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].strweak}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>
				<div>
					<p>
						How effective was the feedback in providing you with specific suggestions for
						improvement?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].specific}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>

				<div>
					<p>
						How valuable was the feedback in helping you learn how to improve your writing skills?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].improve}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>

				<div>
					<p>
						To what degree did the feedback help you feel more confident in your writing abilities?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].confident}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>

				<div>
					<p>
						How helpful was the feedback in identifying areas where you need more practice or
						guidance?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].practice}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>

				<div>
					<p>How much did the feedback help you understand what you did well in your essay?</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].well}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>

				<div>
					<p>
						How useful was the feedback in highlighting areas where you need to focus more attention
						in future essays?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].futimprove}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>

				<div>
					<p>
						How clear and easy to understand was the feedback provided by the essay feedback
						application?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].clear}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>

				<div>
					<p>
						Overall, how helpful was the feedback provided by the essay feedback application in
						improving your essay-writing skills?
					</p>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={questionaire[counter].Overall}
						class="range"
						step="25"
					/>
					<div class="w-full flex justify-between text-xs px-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>
			</div>
		{/each}

		<button class="btn" on:click={() => storeQuestionaire(questionaire)}>Store answers</button>
	</div>
</div>

<!-- 
<div class="flex flex-col gap-4 justify-center items-center">
	<div class="w-1/2 rounded">
		<h3> Assessment of Feedback </h3>
		<p> Kindly read through the following questions carefully and rate your answers on a scale of 1-5, with 1 being "not at all useful" and 5 being "extremely useful". </p>
	</div>
	{#each data.feedback as feedback}
	<div class="felx flex-col gap-4 w-1/2 rounded">
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>

	</div>
	{/each}
</div> -->
