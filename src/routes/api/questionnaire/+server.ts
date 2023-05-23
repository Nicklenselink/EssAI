import { json, type RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const { answers } = await event.request.json();

	const feedback = await prisma.feedback.update({
		where: { id: 1 },
		data: answers[0],
	});

	const feedback1 = await prisma.feedback.update({
		where: { id: 2 },
		data: answers[1],
	});

	const feedback2 = await prisma.feedback.update({
		where: { id: 3 },
		data: answers[2],
	});

	const feedback3 = await prisma.feedback.update({
		where: { id: 4 },
		data: answers[3],
	});
	return json({});
}
