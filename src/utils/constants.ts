import type { SuggestionCard } from '../types/chat.types';

// Rest of your constants remain the same...


// Suggestion cards shown on the New Chat screen
export const SUGGESTION_CARDS: SuggestionCard[] = [
  {
    id: '1',
    icon: '✨',
    text: 'Give me a concise summary of this meeting transcript',
  },
  {
    id: '2',
    icon: '✨',
    text: 'Write a product description for a minimalist smartwatch',
  },
  {
    id: '3',
    icon: '✨',
    text: 'Provide a polite response to a customer asking for a refund',
  },
];

// Predefined assistant responses for simulating chat
export const ASSISTANT_RESPONSES: string[] = [
  "That's a great question! Let me help you with that.",
  "I understand what you're looking for. Here's what I can suggest...",
  "Interesting! I'd be happy to assist you with this.",
  "Based on your request, here are some thoughts...",
  "Let me break this down for you in a clear way.",
  "I can definitely help with that. Here's my response...",
  "Great choice! Let me provide you with some detailed information.",
  "That's something I can assist with. Here's what you need to know...",
];

// App configuration
export const APP_CONFIG = {
  appName: 'Inteliq',
  assistantName: 'ChatGPT 4',
  defaultGreeting: 'Hi Lawrence!',
  defaultPrompt: 'What do you want to learn today?',
  userName: 'Lawrence Cruz',
  maxMessageLength: 1000,
  typingDelay: 1000, // milliseconds before assistant responds
  sidebarWidth: 270,
  headerHeight: 64,
};

// Sidebar navigation items
export const SIDEBAR_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    shortcut: '⌘ H',
  },
  {
    id: 'library',
    label: 'Library',
    icon: 'folder',
    shortcut: '⌘ T',
  },
  {
    id: 'history',
    label: 'History',
    icon: 'history',
    shortcut: '⌘ G',
  },
  {
    id: 'explore',
    label: 'Explore',
    icon: 'explore',
    shortcut: '⌘ L',
  },
];

// Sample recent chats for sidebar
export const SAMPLE_RECENT_CHATS = [
  'Write a Shakespearean sonnet about a cat that...',
  'If cereal commercials were directed by Christo...',
  'Renewable Energy Trends',
  'Describe a medieval jousting tournament wher...',
  'What would a job interview be like if aliens wer...',
  'Generate a rap battle between a sentient toaste...',
  'What if oxygen was actually a hallucinogen and...',
  'Pitch a reality TV show where ghosts haunt infl...',
];

// Colors (additional to theme)
export const COLORS = {
  primaryBlue: '#2563EB',
  backgroundGray: '#F9FAFB',
  borderGray: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  white: '#FFFFFF',
  userMessageBg: '#2563EB',
  assistantMessageBg: '#F3F4F6',
  hoverGray: '#F3F4F6',
};

// File upload configuration
export const FILE_UPLOAD_CONFIG = {
  maxFiles: 5,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  acceptedFormats: [
    '.pdf',
    '.doc',
    '.docx',
    '.txt',
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
  ],
};

// Animation durations (in ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Z-index layers
export const Z_INDEX = {
  sidebar: 1200,
  header: 1100,
  modal: 1300,
  tooltip: 1400,
};

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 600,
  tablet: 900,
  desktop: 1200,
  wide: 1536,
};

// Message character limits
export const MESSAGE_LIMITS = {
  min: 1,
  max: 1000,
  warningThreshold: 900,
};

// Local storage keys
export const STORAGE_KEYS = {
  chats: 'inteliq_chats',
  activeChat: 'inteliq_active_chat',
  sidebarState: 'inteliq_sidebar_state',
  theme: 'inteliq_theme',
};
