import { GoogleGenerativeAI, Content, Part } from '@google/generative-ai';
import { AIConfig } from '../config';
import logger from '../logger';

export class GeminiService {

  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(AIConfig.ChatConfig.apiKey!);
  }

  async sendChat(messageList: Content[], systemPrompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: AIConfig.ChatConfig.model,
      systemInstruction: systemPrompt,
    });

    const history = messageList.slice(0, -1);
    const lastMessage = messageList[messageList.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.parts);
    const text = result.response.text();
    logger.debug(`Gemini response: ${text}`);
    return text;
  }
}
