'use client';
import { useState, useRef, useEffect } from 'react';
import { IoMdChatboxes } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';

interface Message {
    text: string;
    isUser: boolean;
}

const suggestions = [
    "What are your business hours?",
    "Do you offer delivery?",
    "What's on special today?",
    "How can I place an order?",
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! How can I help you today?", isUser: false }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { text: inputText, isUser: true }]);
        const userQuestion = inputText;
        setInputText("");

        // Simulate bot response (replace with actual API call)
        setTimeout(() => {
            const botResponse = getBotResponse(userQuestion);
            setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
        }, 1000);
    };

    const getBotResponse = (question: string): string => {
        // Simple response logic (replace with actual AI/API integration)
        const lowerQuestion = question.toLowerCase();
        if (lowerQuestion.includes("hello") || lowerQuestion.includes("hi")) {
            return "Hello! How can I assist you today?";
        }
        if (lowerQuestion.includes("hours") || lowerQuestion.includes("time")) {
            return "We're open from 9 AM to 9 PM, every day of the week!";
        }
        if (lowerQuestion.includes("delivery")) {
            return "Yes, we offer delivery within 5km radius. Minimum order value is 500 TK.";
        }
        return "I'm here to help! Could you please provide more details about your question?";
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
                >
                    <IoMdChatboxes size={24} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-semibold">Customer Support</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-700 rounded-full p-1"
                        >
                            <IoClose size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        msg.isUser
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    {messages.length <= 2 && (
                        <div className="px-4 py-2 flex gap-2 flex-wrap">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => setInputText(suggestion)}
                                    className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-600"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-600"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
                            >
                                <IoSend size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
