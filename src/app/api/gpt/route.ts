import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {

  const { prompt } = await req.json();  // Recibe el prompt del cuerpo de la solicitud

  if (!prompt) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',//'gpt-3.5-turbo',  
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 250,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Usa la API Key desde el .env
        },
      }
    );

    const completion = response.data.choices[0].message.content.trim();
    return NextResponse.json({ completion });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error en la solicitud a OpenAI:', error.message);
      return NextResponse.json({ message: 'Error al obtener respuesta de OpenAI', error: error.message }, { status: 500 });
    } else {
      console.error('Error desconocido en la solicitud a OpenAI:', error);
      return NextResponse.json({ message: 'Error desconocido al obtener respuesta de OpenAI' }, { status: 500 });
    }
  }
}
