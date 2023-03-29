export async function load(event: any) {
	return {
		session: await event.locals.getSession(),
	};
}
