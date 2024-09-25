// src/app/actions/generateNames.ts
'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateNames(prompt: string, count: number): Promise<string[]> {
  try {
    console.log('OpenAI Request:', { prompt, count });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a creative AI assistant specialized in generating startup names. Generate ${count} unique, creative, and relevant startup names based on the given prompt. Return only a JSON array of strings, without any additional formatting or explanation.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    console.log('OpenAI Response:', response);

    const content = response.choices[0].message.content || '[]'
    // Remove any markdown formatting if present
    const jsonString = content.replace(/```json\n|\n```/g, '').trim()
    const generatedNames = JSON.parse(jsonString)
    
    if (!Array.isArray(generatedNames)) {
      throw new Error('Generated names are not in the expected format')
    }
    
    console.log('Generated Names:', generatedNames);
    return generatedNames
  } catch (error) {
    console.error('Error generating names:', error)
    return []
  }
}
