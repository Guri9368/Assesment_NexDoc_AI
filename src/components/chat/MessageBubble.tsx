import React from 'react';
import { Box, Typography, Avatar, Paper, useTheme } from '@mui/material';
import { Message } from '../../types/chat.types';
import { formatTime, getInitials } from '../../utils/helpers';
import { APP_CONFIG } from '../../utils/constants';

interface MessageBubbleProps {
  message: Message;
  
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isFirstMessage }) => {
  const theme = useTheme();
  const isUser = message.sender === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 36,
          height: 36,
          backgroundColor: isUser
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          border: isUser ? 'none' : `2px solid ${theme.palette.divider}`,
          fontSize: '0.875rem',
          fontWeight: 600,
          color: isUser ? 'white' : theme.palette.text.primary,
          flexShrink: 0,
        }}
      >
        {isUser ? getInitials(APP_CONFIG.userName) : '🤖'}
      </Avatar>

      {/* Message Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {/* Sender Name and Timestamp */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: '0.875rem',
              color: theme.palette.text.primary,
            }}
          >
            {isUser ? APP_CONFIG.userName : APP_CONFIG.assistantName}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              color: theme.palette.text.secondary,
            }}
          >
            {formatTime(message.timestamp)}
          </Typography>
        </Box>

        {/* Message Text */}
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            backgroundColor: isUser
              ? theme.palette.primary.main
              : theme.palette.background.paper,
            color: isUser ? 'white' : theme.palette.text.primary,
            borderRadius: 2,
            border: isUser ? 'none' : `1px solid ${theme.palette.divider}`,
            maxWidth: '100%',
            wordWrap: 'break-word',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.content}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageBubble;
