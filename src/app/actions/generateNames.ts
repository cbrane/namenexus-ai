// src/app/actions/generateNames.ts
'use server'

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

// Read the API key directly from .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const apiKey = envContent.match(/OPENAI_API_KEY=(.*)/)?.[1]

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not found in .env.local')
}

const openai = new OpenAI({
  apiKey: apiKey,
})

export async function generateNames(prompt: string, count: number): Promise<string[]> {
  try {
    console.log('OpenAI Request:', { prompt, count });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
