// Message sender type
export type MessageSender = 'user' | 'assistant';

// Individual message interface
export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp: Date;
}

// Attached file interface
export interface AttachedFile {
  id: string;
  name: string;
  size?: number;
  uploadProgress?: number; // 0-100 for showing upload progress
}

// Chat conversation interface
export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  attachedFiles?: AttachedFile[];
  createdAt: Date;
  updatedAt: Date;
}

// Suggestion card interface (for the prompt cards on new chat screen)
export interface SuggestionCard {
  id: string;
  icon: string;
  text: string;
}

// Chat store state interface
export interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  sidebarOpen: boolean;
  
  // Actions
  createNewChat: () => void;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, content: string, sender: MessageSender) => void;
  addAttachedFile: (chatId: string, file: AttachedFile) => void;
  removeAttachedFile: (chatId: string, fileId: string) => void;
  toggleSidebar: () => void;
  updateChatTitle: (chatId: string, title: string) => void;
}

// Navigation type for screens
export type ScreenType = 'new-chat' | 'active-conversation';
