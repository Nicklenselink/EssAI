import { redirect } from '@sveltejs/kit';

export async function load(event: any) {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(303, '/auth/signin');
	}
	return {
		session,
	};
}
