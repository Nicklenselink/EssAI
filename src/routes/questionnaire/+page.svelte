<script lang="ts">
	    /** @type {import('./$types').PageData} */
		export let data:any;
</script>





<div>
	<div class="flex flex-col gap-4 items-center bg-slate-100">
		<div class="w-1/2 rounded">
			<h3> Assessment of Feedback </h3>
			<p> Kindly read through the following questions carefully and rate your answers on a scale of 1-5, with 1 being "not at all useful" and 5 being "extremely useful". </p>
		</div>
		{#each data.feedback as feedback}
			<div class="felx flex-col gap-4 w-1/2 rounded">
				<div class="py-5"> 
					<p>This was youre feedback:</p>
					<p>{feedback.feedback}</p>
					<p>pleas answer the following questions regarding this feedback.</p>
				</div>
				
				<div>
					<p> How useful was the feedback provided by the application in improving your understanding of the essay's content?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-half flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				<div>
					<p> To what extent did the feedback help you identify strengths and weaknesses in your essay?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				<div>
					<p> How effective was the feedback in providing you with specific suggestions for improvement?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				<div>
					<p> How valuable was the feedback in helping you learn how to improve your writing skills?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				<div>
					<p> To what degree did the feedback help you feel more confident in your writing abilities?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				<div>
					<p> How helpful was the feedback in identifying areas where you need more practice or guidance?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>
				
				<div>
					<p> How much did the feedback help you understand what you did well in your essay?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				<div>
					<p> How much did the feedback help you understand what you did well in your essay?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				<div>
					<p> How useful was the feedback in highlighting areas where you need to focus more attention in future essays?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				
				<div>
					<p> How clear and easy to understand was the feedback provided by the essay feedback application?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
					<div class="w-full flex justify-between text-xs px-2">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					</div>
				</div>

				
				<div>
					<p>Overall, how helpful was the feedback provided by the essay feedback application in improving your essay-writing skills?</p>
					<input type="range" min="0" max="100" value="25" class="range" step="25" />
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