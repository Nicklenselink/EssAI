import { json, type RequestEvent } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
	const { essay } = await request.json();

	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content: 'You are a feedback assistant that gives feedback on student essays.',
			},
			{
				role: 'user',
				content: 'Give feedback on the following essay: "' + essay + '"',
			},
		],
	});
	console.log(completion.data);
	console.log(completion.data.choices[0].message?.content);
	return json(completion.data.choices[0].message?.content);
}
