import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export {};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }: any) {
	const session = await locals.getSession();

	const feedback = await prisma.feedback.findMany({
		where: {
			user: {
				name: session?.user?.name ?? undefined,
			},
		},
	});

	return {
		feedback,
	};
}
