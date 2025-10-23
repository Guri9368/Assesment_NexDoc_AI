import React from 'react';
import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';

interface SuggestionCardProps {
  icon: string;
  text: string;
  onClick: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ icon, text, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        minHeight: '140px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }}
    >
      <CardContent
        sx={{
          padding: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '&:last-child': {
            paddingBottom: 3,
          },
        }}
      >
        {/* Icon Section */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
            }}
          >
            {icon}
          </Typography>
        </Box>

        {/* Text Section */}
        <Typography
          variant="body1"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.palette.text.primary,
            lineHeight: 1.5,
          }}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;
