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

	const openai_requests: CreateChatCompletionRequest[] = [
		{
			model: 'gpt-4-0613',
			messages: [
				{
					role: 'system',
					content: `You are a personalised feedback assistant for essay writing.`,
				},
				{
					role: 'user',
					content:
						`Provide concise feedback for an essay based on its alignment with the assignment requirements. Ensure the feedback covers key elements such as grammar, coherence, and adherence to the topic within a limit of 100 words. The essay written so far is:  "` +
						essay +
						`"`,
				},
			],
		},
		{
			model: 'gpt-4-0613',
			messages: [
				{
					role: 'system',
					content: `You are a personalised feedback assistant for essay writing.`,
				},
				{
					role: 'user',
					content:
						`Provide concise feedback for an essay, incorporating grammar considerations, coherence, adherence to the topic, and alignment with Bloom's Taxonomy as provided within you knowledge base. Ensure the feedback evaluates the essay's effectiveness in meeting the assignment requirements and advancing through the specified learning levels within a limit of 100 words. The essay written so far is:  "` +
						essay +
						`"`,
				},
			],
		},
		{
			model: 'gpt-4-0613',
			messages: [
				{
					role: 'system',
					content: `You are a personalised feedback assistant for essay writing.`,
				},
				{
					role: 'user',
					content:
						`Provide concise feedback for an essay, incorporating grammar considerations, coherence, adherence to the topic, and alignment with the Mason and Brunings paper as provided within your knowledge base. Ensure the feedback evaluates the essay's effectiveness in meeting the assignment requirements and tailor the feedback type and level of elaboration as recommended based on the student achievement, task level, timing of feedback, and prior knowledge within a limit of 100 words. The essay written so far is:  "` +
						essay +
						`"`,
				},
			],
		},
		{
			model: 'gpt-4-0613',
			messages: [
				{
					role: 'system',
					content: `You are a personalised feedback assistant for essay writing.`,
				},
				{
					role: 'user',
					content:
						`Provide concise feedback for an essay based on its alignment with the assignment requirements. Ensure the feedback covers key elements such as grammar, coherence, and adherence to the topic. Please provide feedback based on Bloom's taxonomy and take into account the student's level of analyzing, evaluating, and creating. Do all of the above within a limit of 100 words. The essay written so far is:  "` +
						essay +
						`"`,
				},
			],
		},
		{
			model: 'gpt-4-0613',
			messages: [
				{
					role: 'system',
					content: `You are a personalised feedback assistant for essay writing.`,
				},
				{
					role: 'user',
					content:
						`Provide concise feedback for an essay based on its alignment with the assignment requirements. Ensure the feedback covers key elements such as grammar, coherence, and adherence to the topic. Provide feedback based on Mason and Brunning's taxonomy, namely, knowledge of the correct response with response contingent. Do all of the above within a limit of 100 words. The essay written so far is:  "` +
						essay +
						`"`,
				},
			],
		}
	];
	const openai_request = openai_requests[Math.floor(Math.random() * openai_requests.length)];

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
