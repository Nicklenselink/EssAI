import { json, type RequestEvent } from '@sveltejs/kit';
import {
	Configuration,
	OpenAIApi,
	type CreateChatCompletionRequest,
	type ChatCompletionRequestMessage,
} from 'openai';
import { env } from '$env/dynamic/private';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const session = await event.locals.getSession();
	const { essay } = await event.request.json();

	const openai_configuration = new Configuration({
		apiKey: env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(openai_configuration);

	const prompts = [
		[
			{
				role: 'system',
				content: 'You are a feedback assistant that gives feedback on student essays.',
			},
			{
				role: 'user',
				content: 'Give feedback on the following essay: "' + essay + '"',
			},
		],
	];

	const promptIds = [0, 0, 0, 0];

	const feedbacks = await prisma.feedback.findMany({
		where: {
			user: {
				name: session?.user?.name ?? undefined,
			},
		},
	});

	feedbacks.forEach((feedback) => {
		promptIds.splice(promptIds.indexOf(feedback.promptId), 1);
	});

	if (!promptIds.length) return json({ feedback: 'Sorry, you have reached your feedback quota.' });

	const promptId = promptIds[Math.floor(Math.random() * promptIds.length)];

	const openai_request: CreateChatCompletionRequest = {
		model: 'gpt-4-0314',
		messages: prompts[promptId] as ChatCompletionRequestMessage[],
	};

	const openai_completion = await openai.createChatCompletion(openai_request);

	const feedback = await prisma.feedback.create({
		data: {
			user: {
				connect: {
					name: session?.user?.name ?? undefined,
				},
			},
			essay,
			promptId,
			feedback: openai_completion.data.choices[0].message?.content,
			rawRequest: openai_request as any,
			rawResponse: openai_completion.data as any,
		},
	});
	return json({ feedback: feedback.feedback, id: feedback.id });
}
