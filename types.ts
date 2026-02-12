
export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export interface AppState {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
}
