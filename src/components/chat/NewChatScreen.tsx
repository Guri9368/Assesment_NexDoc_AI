import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useChatStore } from '../../store/chatStore';
import { APP_CONFIG, SUGGESTION_CARDS } from '../../utils/constants';
import SuggestionCard from './SuggestionCard';
import ChatInput from './ChatInput';

const NewChatScreen: React.FC = () => {
  const theme = useTheme();
  const { activeChat, addMessage, createNewChat } = useChatStore();

  const handleSuggestionClick = (suggestionText: string) => {
    if (!activeChat) {
      createNewChat();
      setTimeout(() => {
        const store = useChatStore.getState();
        if (store.activeChat) {
          store.addMessage(store.activeChat.id, suggestionText, 'user');
        }
      }, 100);
    } else {
      addMessage(activeChat.id, suggestionText, 'user');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 3, sm: 4, md: 6 },
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {/* Greeting Section */}
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: 4,
            maxWidth: '1200px',
            width: '100%',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: theme.palette.text.primary,
              marginBottom: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <span>👋</span> {APP_CONFIG.defaultGreeting}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: theme.palette.text.primary,
              lineHeight: 1.3,
            }}
          >
            {APP_CONFIG.defaultPrompt}
          </Typography>
        </Box>

        {/* Suggestion Cards - FORCE 3 IN A ROW */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            maxWidth: '1200px',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {SUGGESTION_CARDS.map((card) => (
            <Box
              key={card.id}
              sx={{
                flex: '1 1 calc(33.333% - 16px)',  // ✅ Each card takes 33.33% width
                minWidth: '280px',  // ✅ Minimum width
                maxWidth: '400px',  // ✅ Maximum width
              }}
            >
              <SuggestionCard
                icon={card.icon}
                text={card.text}
                onClick={() => handleSuggestionClick(card.text)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Chat Input at Bottom */}
      <Box
        sx={{
          width: '100%',
          padding: { xs: 2, sm: 3 },
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
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

export default NewChatScreen;
