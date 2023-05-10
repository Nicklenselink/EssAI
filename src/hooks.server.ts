import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/core/providers/credentials';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handle = sequence(authentication, authorization);

async function authentication(input: any) {
	return SvelteKitAuth({
		providers: [
			Credentials({
				name: 'FAUNA account',
				credentials: {
					username: { label: 'Username', type: 'text' },
				},
				async authorize(credentials) {
					if (!credentials.username) return null;

					let user = await prisma.user.findUnique({
						where: {
							name: credentials.username as string,
						},
					});

					if (user) return user as any;

					user = await prisma.user.create({
						data: {
							name: credentials.username as string,
						},
					});

					return user as any;
				},
			}),
		],
		trustHost: true,
	})(input);
}

async function authorization({ event, resolve }: any) {
	if (!event.url.pathname.startsWith('/api')) return resolve(event);
	if (event.url.pathname == '/api/signin') return resolve(event);

	const session = await event.locals.getSession();
	if (!session) return new Response(null, { status: 401 });

	return resolve(event);
}
