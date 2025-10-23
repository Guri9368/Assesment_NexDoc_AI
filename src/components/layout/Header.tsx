import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Share as ShareIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import { APP_CONFIG } from '../../utils/constants';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarOpen, toggleSidebar, createNewChat } = useChatStore();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer - 1,
        width: '100%',  
        left: 0,       
        right: 0,       
      }}
    >
      <Toolbar
        sx={{
          minHeight: `${APP_CONFIG.headerHeight}px !important`,
          paddingX: { xs: 2, sm: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',   
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!sidebarOpen && (
            <IconButton
              edge="start"
              onClick={toggleSidebar}
              sx={{
                marginRight: 1,
                color: theme.palette.text.primary,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Chip
            icon={
              <Avatar
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'transparent',
                  fontSize: '1rem',
                }}
              >
                🤖
              </Avatar>
            }
            label={APP_CONFIG.assistantName}
            deleteIcon={<KeyboardArrowDownIcon />}
            onDelete={() => {}}
            onClick={() => {}}
            sx={{
              height: 36,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '& .MuiChip-deleteIcon': {
                color: theme.palette.text.secondary,
                fontSize: '1.2rem',
                marginLeft: 0.5,
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              },
            }}
          />
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            size="medium"
          >
            <ShareIcon fontSize="small" />
          </IconButton>

          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            size="medium"
          >
            <HelpOutlineIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={createNewChat}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 2,
              paddingX: 2,
              paddingY: 0.75,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            size="medium"
          >
            <AddIcon fontSize="small" sx={{ marginRight: 0.5 }} />
            {!isMobile && (
              <Typography
                variant="button"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'none',
                }}
              >
                New Chat
              </Typography>
            )}
          </IconButton>

          {isMobile && (
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.primary.main,
                fontSize: '0.75rem',
                marginLeft: 1,
              }}
            >
              LC
            </Avatar>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
