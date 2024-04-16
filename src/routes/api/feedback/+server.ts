import { json, type RequestEvent } from '@sveltejs/kit'; 
import { Configuration, OpenAIApi, type CreateChatCompletionRequest } from 'openai'; 
import { env } from '$env/dynamic/private'; // Importing environment variables
import { PrismaClient } from '@prisma/client'; // Importing PrismaClient for interacting with the database


const prisma = new PrismaClient();
let condition = Math.floor(Math.random() * 6); // Select condition (this is done after you run the command "npm run dev" in the terminal, meaning to get a different condition again, you'll have to restart this)

// Define the POST function to handle HTTP POST requests
export async function POST(event: RequestEvent) {
    // Retrieve the session information from the event
    const session = await event.locals.getSession();

    const { essay } = await event.request.json();

    
        const openai_requests: CreateChatCompletionRequest[] = [
			{
				model: 'gpt-4-0613',
				messages: [
					{
						role: 'system',
						content: `You are a personalised feedback assistant for essay writing.`,
					},
					{
						role: 'user',
						content:
							`Provide concise feedback for an essay based on its alignment with the assignment requirements. Ensure the feedback covers key elements such as grammar, coherence, and adherence to the topic within a limit of 100 words. Also, please end your message with the number 0. The essay written so far is:  "` +
							essay +
							`"`,
					},
				],
			},
			{
				model: 'gpt-4-0613',
				messages: [
					{
						role: 'system',
						content: `You are a personalised feedback assistant for essay writing.`,
					},
					{
						role: 'user',
						content:
							`Provide concise feedback for an essay, incorporating grammar considerations, coherence, adherence to the topic, and alignment with Bloom's Taxonomy as provided within you knowledge base. Ensure the feedback evaluates the essay's effectiveness in meeting the assignment requirements and advancing through the specified learning levels within a limit of 100 words. Also, please end your message with the number 1. The essay written so far is:  "` +
							essay +
							`"`,
					},
				],
			},
			{
				model: 'gpt-4-0613',
				messages: [
					{
						role: 'system',
						content: `You are a personalised feedback assistant for essay writing.`,
					},
					{
						role: 'user',
						content:
							`Provide concise feedback for an essay, incorporating grammar considerations, coherence, adherence to the topic, and alignment with the Mason and Brunings paper as provided within your knowledge base. Ensure the feedback evaluates the essay's effectiveness in meeting the assignment requirements and tailor the feedback type and level of elaboration as recommended based on the student achievement, task level, timing of feedback, and prior knowledge within a limit of 100 words. Also, please end your message with the number 2. The essay written so far is:  "` +
							essay +
							`"`,
					},
				],
			},
			{
				model: 'gpt-4-0613',
				messages: [
					{
						role: 'system',
						content: `You are a personalised feedback assistant for essay writing.`,
					},
					{
						role: 'user',
						content:
							`Provide concise feedback for an essay based on its alignment with the assignment requirements. Ensure the feedback covers key elements such as grammar, coherence, and adherence to the topic. Please provide feedback based on Bloom's taxonomy and take into account the student's level of analyzing, evaluating, and creating. Do all of the above within a limit of 100 words. Also, please end your message with the number 3. The essay written so far is:  "` +
							essay +
							`"`,
					},
				],
			},
			{
				model: 'gpt-4-0613',
				messages: [
					{
						role: 'system',
						content: `You are a personalised feedback assistant for essay writing.`,
					},
					{
						role: 'user',
						content:
							`Provide concise feedback for an essay based on its alignment with the assignment requirements. Ensure the feedback covers key elements such as grammar, coherence, and adherence to the topic. Provide feedback based on Mason and Brunning's taxonomy, namely, knowledge of the correct response with response contingent. Do all of the above within a limit of 100 words. Also, please end your message with the number 4. The essay written so far is:  "` +
							essay +
							`"`,
					},
				],
			}
		];
        const openai_request = openai_requests[condition];

    // Configure OpenAI API with the provided API key
    const openai_configuration = new Configuration({
        apiKey: env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(openai_configuration);

    // Request completion from OpenAI based on the updated request with the new essay content
    const openai_completion = await openai.createChatCompletion(openai_request);

    // Create a new feedback record in the database using Prisma
    const feedback = await prisma.feedback.create({
        data: {
            // Connect the feedback to the user's session if available
            user: {
                connect: {
                    name: session?.user?.name ?? undefined, // Connect to the user by name if available, otherwise connect to undefined
                },
            },
            essay, // Store the essay content
            // Store the feedback generated by OpenAI
            feedback: openai_completion.data.choices[0].message?.content,
            // Store the raw request and response from OpenAI for reference
            rawRequest: openai_request as any,
            rawResponse: openai_completion.data as any,
			cond: condition
        },
    });

    // Return the feedback and ID as JSON response
    return json({ feedback: feedback.feedback, id: feedback.id });
}

