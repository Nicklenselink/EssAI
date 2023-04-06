import { json, type RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const { id, helpful } = await event.request.json();

	const feedback = await prisma.feedback.update({
		where: { id: id },
		data: { helpful: helpful },
	});
	return json({ id: feedback.id, helpful: feedback.helpful });
}
