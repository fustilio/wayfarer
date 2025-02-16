import { generateObject } from 'ai';
import { z } from 'zod';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Coordinate, PointOfInformationSchema } from '../schemas';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = google('gemini-2.0-flash-exp');
export async function parseImageRetrieveInformation(imageString: string) {
  const { object } = await generateObject({
    model: model,
    schema: z.object({
      title: z.string().describe('Title of the information extracted'),
      text: z.string().describe('Text information extracted'),
    }),
    messages: [
      {
        role: 'system',
        content: 'Extract out ALL information, without missing anything.',
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Here is my image',
          },
          {
            type: 'image',
            image: imageString,
          },
        ],
      },
    ],
  });

  console.log('object', JSON.stringify(object, null, 2));

  return object;
}

export async function generatePointOfInformation(
  imageString: string,
  coords: Coordinate
) {
  const { text: textInfo, title } = await parseImageRetrieveInformation(
    imageString
  );

  return PointOfInformationSchema.parse({
    name: title,
    description: textInfo,
    coordinates: coords,
  });
}
