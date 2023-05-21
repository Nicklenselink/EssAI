import { PrismaClient } from '@prisma/client';
import type { PageServerLoadEvent } from './$types';

const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load(event: PageServerLoadEvent) {
	const session = await event.locals.getSession();

	const metrics = await prisma.metric.findMany({
		where: {
			user: {
				name: session?.user?.name ?? undefined,
			},
		},
		orderBy: {
			id: 'desc',
		},
		take: 1,
	});

	return metrics.length ? { essayContents: metrics[0].essayContents } : {};
}
