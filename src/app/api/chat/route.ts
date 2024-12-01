import { NextResponse } from "next/server";

type QAData = {
  [key: string]: string;
};

// Predefined QA pairs
const qaData: QAData = {
  "hi": "Hello! How can I help you today?",
  "what can you do?": "I can help you with various tasks like coding, answering questions, and providing information about different topics.",
  "tell me about yourself": "I'm an AI assistant designed to help with various tasks and answer questions.",
  "who created you?": "I was created by Google as part of their Gemini AI model family.",
  "what is your name?": "You can call me Gemini!",
  "how are you?": "I'm functioning well, thank you for asking! How can I assist you today?",
  "what time is it?": "I can't tell real-time information, but I can help you with other questions!",
  "goodbye": "Goodbye! Have a great day!",
  "thanks": "You're welcome! Let me know if you need anything else.",
  "help": "I can help you with various topics. Try asking me about coding, general knowledge, or any other questions you have!"
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage.content.toLowerCase().trim();

    // Get predefined response or default message
    const response = qaData[userInput] || "I'm not sure how to respond to that. Try asking me something else!";

    return NextResponse.json({ content: response });

  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 