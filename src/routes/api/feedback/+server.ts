import { json, type RequestEvent } from '@sveltejs/kit';
import {
	Configuration,
	OpenAIApi,
	type CreateChatCompletionRequest,
	type ChatCompletionRequestMessage,
} from 'openai';
import { env } from '$env/dynamic/private';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const session = await event.locals.getSession();
	const { essay } = await event.request.json();

	const openai_configuration = new Configuration({
		apiKey: env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(openai_configuration);

	const prompts = [
		[
			{
				role: 'system',
				content: `You are a personalised feedback assistant for essay writing based on Bloom's Taxonomy.`,
			},
			{
				role: 'user',
				content:
					`Could you provide me constructive and concise feedback only on the next Bloom's taxonomy level? You do not need to include the levels. The feedback must be 2 bullet points of max 2 sentences each. The essay written so far is:  "` +
					essay +
					`"`,
			},
		],
		[
			{
				role: 'system',
				content: `You are a personalised feedback assistant for essay writing based on Bloom's Taxonomy.
				The student has received the following assignment:
				
				"As you read the passage below, consider how Zadie Smith uses: 
				• evidence, such as facts or examples, to support claims. 
				• reasoning to develop ideas and to connect claims and evidence. 
				• stylistic or persuasive elements, such as word choice or appeals to emotion, to add power to the ideas expressed. 
				
				Adapted from Zadie Smith, “The North West London Blues.” ©2012 by NYREV, Inc. Originally published June 2, 2012. Writer Zadie Smith wrote the following piece in response to news that several local libraries in the greater London area, including Kensal Rise and Willesden Green Libraries, would be closed down. 
				
				What kind of a problem is a library? It's clear that for many people it is not a problem at all, only a kind of obsolescence. At the extreme pole of this view is the technocrat's total faith: with every book in the world online, what need could there be for the physical reality? This kind of argument thinks of the library as a function rather than a plurality of individual spaces. But each library is a different kind of problem and “the Internet” is no more a solution for all of them than it is their universal death knell. Each morning I struggle to find a seat in the packed university library in which I write this, despite the fact every single student in here could be at home in front of their macbook browsing Google Books.... Kensal Rise is being closed not because it is unpopular but because it is unprofitable, this despite the fact that the friends of Kensal Rise library are willing to run their library themselves.... Meanwhile it is hard not to conclude that Willesden Green is being mutilated not least because the members of the council see the opportunity for a sweet real estate deal. 
				
				All libraries have a different character and setting. Some are primarily for children or primarily for students, or the general public, primarily full of books or microfilms or digitized material or with a café in the basement or a market out front. Libraries are not failing “because they are libraries.” Neglected libraries get neglected, and this cycle, in time, provides the excuse to close them. Well-run libraries are filled with people because what a good library offers cannot be easily found elsewhere: an indoor public space in which you do not have to buy anything in order to stay. 
				
				In the modern state there are very few sites where this is possible. . . . It would seem the most obvious thing in the world to say that the reason why the market is not an efficient solution to libraries is because the market has no use for a library. Nor can the experience of library life be recreated online. It's not just a matter of free books. A library is a different kind of social reality (of the three dimensional kind), which by its very existence teaches a system of values beyond the fiscal.
				
				I don't think the argument in favor of libraries is especially ideological or ethical. I would even agree with those who say it's not especially logical. I think for most people it's emotional. Not logos or ethos but pathos. This is not a denigration: emotion also has a place in public policy. We're humans, not robots. The people protesting the closing of Kensal Rise Library love that library. They were open to any solution on the left or on the right if it meant keeping their library open....A library is one of those social goods that matter to people of many different political attitudes. All that the friends of Kensal Rise and Willesden Library and similar services throughout the country are saying is: these places are important to us. We get that money is tight, we understand that there is a hierarchy of needs, and that [libraries] are not hospital beds and classroom size. But they are still a significant part of our social reality, the only thing left on the... street that doesn't want either your soul or your wallet. In North West London people are even willing to form human chains in front of them. People have taken to writing long pieces in newspapers to “defend” them. Just saying the same thing over and over again. Defend our libraries. We like libraries. Can we keep our libraries? We need to talk about libraries. Pleading, like children. Is that really where we are?
				

				Write a 500 word essay in which you explain how Zadie Smith builds an argument to persuade her audience that public libraries are important and should remain open. 
				
				In your essay, analyze how Smith uses one or more of the features listed in the box above (or features of your own choice) to strengthen the logic and persuasiveness of her argument. Be sure that your analysis focuses on the most relevant features of the passage. Your essay should not explain whether you agree with Smith’s claims, but rather explain how Smith builds an argument to persuade her audience"
				`,
			},
			{
				role: 'user',
				content:
					`Could you provide me constructive and concise feedback only on the next Bloom's taxonomy level? You do not need to include the levels. The feedback must be 2 bullet points of max 2 sentences each. The essay written so far is:  "` +
					essay +
					`"`,
			},
		],
	];

	const promptIds = [0, 0, 1, 1];

	const feedbacks = await prisma.feedback.findMany({
		where: {
			user: {
				name: session?.user?.name ?? undefined,
			},
		},
	});

	feedbacks.forEach((feedback) => {
		promptIds.splice(promptIds.indexOf(feedback.promptId), 1);
	});

	if (!promptIds.length) return json({ feedback: 'Sorry, you have reached your feedback quota.' });

	const promptId = promptIds[Math.floor(Math.random() * promptIds.length)];

	const openai_request: CreateChatCompletionRequest = {
		model: 'gpt-4-0314',
		messages: prompts[promptId] as ChatCompletionRequestMessage[],
	};

	const openai_completion = await openai.createChatCompletion(openai_request);

	const feedback = await prisma.feedback.create({
		data: {
			user: {
				connect: {
					name: session?.user?.name ?? undefined,
				},
			},
			essay,
			promptId,
			feedback: openai_completion.data.choices[0].message?.content,
			rawRequest: openai_request as any,
			rawResponse: openai_completion.data as any,
		},
	});
	return json({ feedback: feedback.feedback, id: feedback.id });
}
