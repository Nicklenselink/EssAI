import { json, type RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const session = await event.locals.getSession();
	const { answers } = await event.request.json();

	const feedbacks = await prisma.feedback.findMany({
		where: {
			user: {
				name: session?.user?.name ?? undefined,
			},
		},
	});

	feedbacks.forEach(async (feedback, i) => {
		await prisma.feedback.update({
			where: { id: feedback.id },
			data: answers[i],
		});
	});

	return json({});
}
