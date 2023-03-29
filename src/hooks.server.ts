import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/core/providers/credentials';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';

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
					const authResponse = await input.event.fetch('/api/signin', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(credentials),
					});

					if (!authResponse.ok) {
						return null;
					}

					const user = await authResponse.json();

					return user;
				},
			}),
		],
	})(input);
}

async function authorization({ event, resolve }: any) {
	if (event.url.pathname == '/api/signin') return resolve(event);

	const session = await event.locals.getSession();
	if (!session) {
		if (event.url.pathname.startsWith('/api')) return new Response(null, { status: 401 });
		throw redirect(303, '/auth/signin');
	}

	return resolve(event);
}
