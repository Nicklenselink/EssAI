import { json, type RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const session = await event.locals.getSession();
	const { essayText, essayContents, essayLength, essayWordCount, essayDeltas, clientTime } =
		await event.request.json();

	const feedback = await prisma.metric.create({
		data: {
			user: {
				connect: {
					name: session?.user?.name ?? undefined,
				},
			},
			essayText,
			essayContents,
			essayLength,
			essayWordCount,
			essayDeltas,
			clientTime: new Date(clientTime),
		},
	});
	return json({ feedback: feedback.feedback, id: feedback.id });
}
