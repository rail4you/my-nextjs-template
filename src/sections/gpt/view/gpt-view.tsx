'use client';
import React, { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const GptView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4 mb-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg ${
                                message.role === 'user'
                                    ? 'bg-blue-100 ml-auto'
                                    : 'bg-gray-100'
                            }`}
                        >
                            {message.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GptView;