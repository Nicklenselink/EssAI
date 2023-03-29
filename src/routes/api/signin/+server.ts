import { json, type RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST({ request }: RequestEvent) {
	const { username } = await request.json();

	let user = await prisma.user.findUnique({
		where: {
			name: username,
		},
	});

	if (user) return json(user);

	user = await prisma.user.create({
		data: {
			name: username,
		},
	});

	return json(user);
}
