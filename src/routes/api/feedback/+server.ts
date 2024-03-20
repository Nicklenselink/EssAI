import { json, type RequestEvent } from '@sveltejs/kit';
import { Configuration, OpenAIApi, type CreateChatCompletionRequest } from 'openai';
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

	const openai_request: CreateChatCompletionRequest = {
		model: 'gpt-4-0613',
		messages: [
			{
				role: 'system',
				content: `You are a personalised feedback assistant for essay writing based on Bloom's Taxonomy.`,
			},
			{
				role: 'user',
				content:
					`Could you provide me constructive and concise feedback only on the next Bloom's taxonomy level? You do not need to include the levels. The feedback must be 2 bullet points of max 2 sentences each. The essay written so far is:  "` +
					essay +
					`"`,
			},
		],
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
			feedback: openai_completion.data.choices[0].message?.content,
			rawRequest: openai_request as any,
			rawResponse: openai_completion.data as any,
		},
	});
	return json({ feedback: feedback.feedback, id: feedback.id });
}
