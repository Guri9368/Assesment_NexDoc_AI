import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ChatState, Chat, Message, AttachedFile, MessageSender } from '../types/chat.types';
import { ASSISTANT_RESPONSES } from '../utils/constants';

// Helper function to get random assistant response
const getRandomAssistantResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * ASSISTANT_RESPONSES.length);
  return ASSISTANT_RESPONSES[randomIndex];
};

// Helper function to generate chat title from first message
const generateChatTitle = (firstMessage: string): string => {
  const maxLength = 50;
  if (firstMessage.length <= maxLength) {
    return firstMessage;
  }
  return firstMessage.substring(0, maxLength) + '...';
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChat: null,
  sidebarOpen: true,

  // Create a new chat
  createNewChat: () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      attachedFiles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChat: newChat,
    }));
  },

  // Set active chat by ID
  setActiveChat: (chatId: string) => {
    const chat = get().chats.find((c) => c.id === chatId);
    if (chat) {
      set({ activeChat: chat });
    }
  },

  // Add a message to a specific chat
  addMessage: (chatId: string, content: string, sender: MessageSender) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date(),
    };

    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, newMessage];
          const updatedChat = {
            ...chat,
            messages: updatedMessages,
            updatedAt: new Date(),
            // Update title if this is the first user message
            title:
              chat.messages.length === 0 && sender === 'user'
                ? generateChatTitle(content)
                : chat.title,
          };

          // If this is a user message, simulate assistant response
          if (sender === 'user') {
            setTimeout(() => {
              get().addMessage(chatId, getRandomAssistantResponse(), 'assistant');
            }, 1000); // 1 second delay to simulate thinking
          }

          return updatedChat;
        }
        return chat;
      });

      const updatedActiveChat =
        state.activeChat?.id === chatId
          ? updatedChats.find((c) => c.id === chatId) || state.activeChat
          : state.activeChat;

      return {
        chats: updatedChats,
        activeChat: updatedActiveChat,
      };
    });
  },

  // Add attached file to a chat
  addAttachedFile: (chatId: string, file: AttachedFile) => {
    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            attachedFiles: [...(chat.attachedFiles || []), file],
            updatedAt: new Date(),
          };
        }
        return chat;
      });

      const updatedActiveChat =
        state.activeChat?.id === chatId
          ? updatedChats.find((c) => c.id === chatId) || state.activeChat
          : state.activeChat;

      return {
        chats: updatedChats,
        activeChat: updatedActiveChat,
      };
    });
  },

  // Remove attached file from a chat
  removeAttachedFile: (chatId: string, fileId: string) => {
    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            attachedFiles: (chat.attachedFiles || []).filter((f) => f.id !== fileId),
            updatedAt: new Date(),
          };
        }
        return chat;
      });

      const updatedActiveChat =
        state.activeChat?.id === chatId
          ? updatedChats.find((c) => c.id === chatId) || state.activeChat
          : state.activeChat;

      return {
        chats: updatedChats,
        activeChat: updatedActiveChat,
      };
    });
  },

  // Toggle sidebar open/close
  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  },

  // Update chat title
  updateChatTitle: (chatId: string, title: string) => {
    set((state) => {
      const updatedChats = state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, title, updatedAt: new Date() }
          : chat
      );

      const updatedActiveChat =
        state.activeChat?.id === chatId
          ? updatedChats.find((c) => c.id === chatId) || state.activeChat
          : state.activeChat;

      return {
        chats: updatedChats,
        activeChat: updatedActiveChat,
      };
    });
  },
}));
