"use client";
import { useState } from 'react';
import axios from 'axios';

export default function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('/api/gpt', { prompt });
            setResponse(res.data.completion);
        } catch (error) {
            setResponse('Error al obtener respuesta');
        }

        setLoading(false);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4 text-black">Chatbot de Asistencia al Viajero</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Escribe tu consulta..."
                    rows={4} // <- Asegúrate de que sea un número
                    className="w-full p-2 border border-gray-300 text-black"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-black px-4 py-2 mt-2"
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>

            {response && (
                <div className="mt-4 p-4 border border-gray-300">
                    <h2 className="text-lg">Respuesta:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}
