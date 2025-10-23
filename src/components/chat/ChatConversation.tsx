import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { useChatStore } from '../../store/chatStore';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const ChatConversation: React.FC = () => {
  const theme = useTheme();
  const { activeChat } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages]);

  if (!activeChat || activeChat.messages.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Messages Area */}
      <Box
        ref={messagesContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.text.disabled,
            },
          },
        }}
      >
        {/* Messages Container with max width */}
        <Box
          sx={{
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {activeChat.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              
            />
          ))}

          {/* Invisible element for auto-scroll */}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      {/* Chat Input at Bottom */}
      <Box
        sx={{
          width: '100%',
          padding: { xs: 2, sm: 3 },
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <ChatInput />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatConversation;
