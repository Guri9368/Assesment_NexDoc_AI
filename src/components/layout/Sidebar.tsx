import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Folder as FolderIcon,
  History as HistoryIcon,
  Explore as ExploreIcon,
  ChevronLeft as ChevronLeftIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import { APP_CONFIG, SIDEBAR_ITEMS, SAMPLE_RECENT_CHATS } from '../../utils/constants';
import { truncateText, getInitials } from '../../utils/helpers';

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarOpen, toggleSidebar, chats, activeChat, setActiveChat } = useChatStore();

  const sidebarWidth = APP_CONFIG.sidebarWidth;

  // Map icon names to components
  const iconMap: Record<string, React.ReactElement> = {
    home: <HomeIcon />,
    folder: <FolderIcon />,
    history: <HistoryIcon />,
    explore: <ExploreIcon />,
  };

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Logo and Toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing(2, 2),
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              backgroundColor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>
              G
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            {APP_CONFIG.appName}
          </Typography>
        </Box>
        <IconButton onClick={toggleSidebar} size="small">
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      {/* Search Bar */}
      <Box sx={{ padding: theme.spacing(2) }}>
        <TextField
          fullWidth
          placeholder="Search for chats..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary, fontSize: '1.2rem' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
      </Box>

      {/* Navigation Items */}
      <Box sx={{ padding: theme.spacing(0, 1) }}>
        <List>
          {SIDEBAR_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ marginBottom: 0.5 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: theme.palette.text.secondary }}>
                  {iconMap[item.icon]}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.disabled, fontSize: '0.75rem' }}
                >
                  {item.shortcut}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ marginY: 1 }} />

      {/* Recent Chats Section */}
      <Box sx={{ padding: theme.spacing(0, 2, 1, 2) }}>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Recent Chats
        </Typography>
      </Box>

      {/* Recent Chats List */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: theme.spacing(0, 1),
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '3px',
          },
        }}
      >
        <List>
          {chats.length > 0
            ? chats.map((chat) => (
                <ListItem key={chat.id} disablePadding sx={{ marginBottom: 0.5 }}>
                  <ListItemButton
                    selected={activeChat?.id === chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    sx={{
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <ListItemText
                      primary={truncateText(chat.title, 40)}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: activeChat?.id === chat.id ? 500 : 400,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            : SAMPLE_RECENT_CHATS.map((chatTitle, index) => (
                <ListItem key={index} disablePadding sx={{ marginBottom: 0.5 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText
                      primary={chatTitle}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: theme.palette.text.secondary,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
        </List>

        {/* View All Link */}
        <Box sx={{ padding: theme.spacing(1, 2) }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.primary.main,
              cursor: 'pointer',
              fontSize: '0.875rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            View All →
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Try Pro Section */}
      <Box
        sx={{
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            padding: theme.spacing(1.5),
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'white', fontSize: '1rem' }}>🚀</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
              Try Pro!
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}
            >
              Upgrade for smarter AI and more...
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* User Profile Section */}
      <Box
        sx={{
          padding: theme.spacing(2),
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: theme.palette.primary.main,
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {getInitials(APP_CONFIG.userName)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            {APP_CONFIG.userName}
          </Typography>
        </Box>
        <IconButton size="small">
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={sidebarOpen}
      onClose={toggleSidebar}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
