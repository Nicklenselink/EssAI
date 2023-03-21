import { json, type RequestEvent } from '@sveltejs/kit';
import { Configuration, OpenAIApi, type CreateChatCompletionRequest } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
	const { essay } = await request.json();

	const openai_configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(openai_configuration);

	const openai_request: CreateChatCompletionRequest = {
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
	};

	const openai_completion = await openai.createChatCompletion(openai_request);

	const feedback = await prisma.feedback.create({
		data: {
			essay: essay,
			feedback: openai_completion.data.choices[0].message?.content,
			raw_request: openai_request as any,
			raw_response: openai_completion.data as any,
		},
	});
	return json({ feedback: feedback.feedback });
}
