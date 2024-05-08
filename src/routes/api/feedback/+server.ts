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
							`Could you check my essay for grammar and confirm if it aligns with the assignment? It should describe the future of education in 2035, focusing on artificial intelligence, differentiation, and scaffolding. The essay aims to explain these concepts, their impact on learning, and their application in an educational context to form a future vision. Please assess if it effectively addresses these points within a 300-400 word limit. Please make sure that your response is within 100 words. Also, please end your message with the number 0. The essay written so far is:  "` +
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
							`Could you check my essay for grammar and confirm if it aligns with the assignment? It should describe the future of education in 2035, focusing on artificial intelligence, differentiation, and scaffolding. The essay aims to explain these concepts, their impact on learning, and their application in an educational context to form a future vision. Ensure the feedback aligns with Benjamin Bloom's taxonomy of learning. Please assess if it effectively addresses these points within a 300-400 word limit. Please ensure your response is within 100 words and aligns with Bloom's taxonomy. Make sure not to talk about the Taxonomy but to give feedback that aligns with Bloom's vision of good feedback. Also, please end your message with the number 1. The essay written so far is:  "` +
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
							`Could you check my essay for grammar and confirm if it aligns with the assignment? It should describe the future of education in 2035, focusing on artificial intelligence, differentiation, and scaffolding. The essay aims to explain these concepts, their impact on learning, and their application in an educational context to form a future vision. Ensure the feedback aligns with the paper “Providing Feedback in Computer-based Instruction: What the Research Tells Us" by Mason & Bruning. Please assess if it effectively addresses these points within a 300-400 word limit. Please ensure your response is within 100 words and aligns with Mason & Bruning's idea of good feedback. Do not mention the paper or the authors, but give feedback that aligns with their vision of good feedback. Also, please end your message with the number 2. The essay written so far is:  "` +
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
							`Could you check my essay for grammar and confirm if it aligns with the assignment? It should describe the future of education in 2035, focusing on artificial intelligence, differentiation, and scaffolding. The essay aims to explain these concepts, their impact on learning, and their application in an educational context to form a future vision. Ensure the feedback aligns with Benjamin Bloom's taxonomy of learning. Ensure the feedback specifically addresses the 'Application' and 'Analysis' levels of Bloom's taxonomy. Please assess if it effectively addresses these points within a 300-400 word limit. Please ensure your response is within 100 words and targets 'Application' and 'Analysis' from Bloom's taxonomy specifically. Make sure not to talk about the Taxonomy but to give feedback that aligns with Bloom's vision of good feedback. Also, please end your message with the number 3. The essay written so far is:  "` +
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
							`Could you check my essay for grammar and confirm if it aligns with the assignment? It should describe the future of education in 2035, focusing on artificial intelligence, differentiation, and scaffolding. The essay aims to explain these concepts, their impact on learning, and their application in an educational context to form a future vision. Ensure the feedback aligns with the paper “Providing Feedback in Computer-based Instruction: What the Research Tells Us" by Mason & Bruning. Utilize response-contingent feedback to provide detailed explanations on the accuracy of my arguments and to clarify any incorrect assumptions. Apply topic-contingent feedback to help me connect my ideas more clearly with the existing literature, offering guidance on where to find supporting information or further insights. Incorporate attribute-isolation feedback to highlight key attributes of each concept discussed, enhancing my understanding of their central importance to future educational settings. Please assess if it effectively addresses these points within a 300-400 word limit. Please ensure your response is within 100 words and aligns with Mason & Bruning's idea of Bruning's idea of good feedback. Do not mention the paper or the authors. Also, please end your message with the number 4. The essay written so far is:  "` +
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

