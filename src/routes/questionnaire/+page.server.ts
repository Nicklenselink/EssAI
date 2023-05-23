import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export {};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }: any) {
	const session = await locals.getSession();
	const user = await prisma.user.findUnique({
		where: {
			name: session?.user?.name ?? undefined,
		},
	});

	const feedback = await prisma.feedback.findMany({
		where: {
			user: {
				name: session?.user?.name ?? undefined,
			},
		},
	});

	return {
		feedback,
		user,
	};
}
