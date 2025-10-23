import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  LinearProgress,
  useTheme,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
} from '@mui/icons-material';
import { AttachedFile } from '../../types/chat.types';
import { formatFileSize, getFileExtension } from '../../utils/helpers';

interface AttachedFilesListProps {
  files: AttachedFile[];
  onRemove: (fileId: string) => void;
}

const AttachedFilesList: React.FC<AttachedFilesListProps> = ({ files, onRemove }) => {
  const theme = useTheme();

  // Get appropriate icon based on file extension
  const getFileIcon = (filename: string) => {
    const extension = getFileExtension(filename);
    switch (extension) {
      case 'pdf':
        return <PdfIcon sx={{ color: '#EF4444' }} />;
      case 'doc':
      case 'docx':
        return <DocIcon sx={{ color: '#2563EB' }} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <ImageIcon sx={{ color: '#10B981' }} />;
      default:
        return <FileIcon sx={{ color: theme.palette.text.secondary }} />;
    }
  };

  if (files.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: '0.875rem',
            color: theme.palette.text.primary,
          }}
        >
          Attached Files
        </Typography>
        <Chip
          label={`${files.length}`}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.75rem',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          }}
        />
      </Box>

      {/* Files List */}
      {files.map((file) => (
        <Paper
          key={file.id}
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            padding: 1.5,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* File Icon */}
          <Box
            sx={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            {getFileIcon(file.name)}
          </Box>

          {/* File Info */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: '0.875rem',
                color: theme.palette.text.primary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {file.name}
            </Typography>

            {/* File Size or Progress */}
            {file.uploadProgress !== undefined && file.uploadProgress < 100 ? (
              <Box sx={{ marginTop: 0.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={file.uploadProgress}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: theme.palette.divider,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.75rem',
                    marginTop: 0.5,
                  }}
                >
                  {file.uploadProgress}%
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem',
                }}
              >
                {file.size ? formatFileSize(file.size) : 'Uploaded'}
              </Typography>
            )}
          </Box>

          {/* Remove Button */}
          <IconButton
            size="small"
            onClick={() => onRemove(file.id)}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.error.main,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
};

export default AttachedFilesList;
