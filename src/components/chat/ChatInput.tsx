import React, { useState, useRef, KeyboardEvent } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  useTheme,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import { v4 as uuidv4 } from 'uuid';
import { AttachedFile } from '../../types/chat.types';
import AttachedFilesList from './AttachedFilesList';
import { FILE_UPLOAD_CONFIG } from '../../utils/constants';

const ChatInput: React.FC = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { activeChat, addMessage, addAttachedFile, createNewChat } = useChatStore();

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Create new chat if none exists
    let chatId = activeChat?.id;
    if (!chatId) {
      createNewChat();
      // Get the newly created chat ID after a small delay
      setTimeout(() => {
        const store = useChatStore.getState();
        if (store.activeChat) {
          chatId = store.activeChat.id;
          // Add attached files to the new chat
          attachedFiles.forEach((file) => {
            addAttachedFile(chatId!, file);
          });
          // Send the message
          addMessage(chatId, message.trim(), 'user');
        }
      }, 50);
    } else {
      // Add attached files to existing chat
      attachedFiles.forEach((file) => {
        addAttachedFile(chatId!, file);
      });
      // Send the message
      addMessage(chatId, message.trim(), 'user');
    }

    // Clear input and attached files
    setMessage('');
    setAttachedFiles([]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newFile: AttachedFile = {
        id: uuidv4(),
        name: file.name,
        size: file.size,
        uploadProgress: 0,
      };

      setAttachedFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setAttachedFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id ? { ...f, uploadProgress: progress } : f
          )
        );
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const characterCount = message.length;
  const maxCharacters = 1000;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Attached Files List */}
      {attachedFiles.length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          <AttachedFilesList files={attachedFiles} onRemove={handleRemoveFile} />
        </Box>
      )}

      {/* Input Box */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          position: 'relative',
        }}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={FILE_UPLOAD_CONFIG.acceptedFormats.join(',')}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />

        {/* Attach File Button */}
        <Tooltip title="Attach file">
          <IconButton
            onClick={handleAttachClick}
            sx={{
              marginBottom: 1,
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.primary.main,
              },
            }}
          >
            <AttachFileIcon />
          </IconButton>
        </Tooltip>

        {/* Attach Image Button */}
        <Tooltip title="Attach image">
          <IconButton
            onClick={handleAttachClick}
            sx={{
              marginBottom: 1,
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.primary.main,
              },
            }}
          >
            <ImageIcon />
          </IconButton>
        </Tooltip>

        {/* Text Input Field */}
        <TextField
          fullWidth
          multiline
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me a question..."
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
              paddingRight: 1,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {/* Character Count */}
                  {characterCount > 0 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          characterCount > maxCharacters
                            ? theme.palette.error.main
                            : theme.palette.text.disabled,
                        fontSize: '0.75rem',
                      }}
                    >
                      {characterCount}/{maxCharacters}
                    </Typography>
                  )}

                  {/* Send Button */}
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={message.trim() === '' || characterCount > maxCharacters}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      width: 36,
                      height: 36,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                      '&.Mui-disabled': {
                        backgroundColor: theme.palette.action.disabledBackground,
                        color: theme.palette.action.disabled,
                      },
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatInput;
