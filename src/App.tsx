import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import Layout from './components/layout/Layout';
import NewChatScreen from './components/chat/NewChatScreen';
import ChatConversation from './components/chat/ChatConversation';
import { useChatStore } from './store/chatStore';

function App() {
  const { activeChat } = useChatStore();

  // Determine which screen to show
  const showNewChatScreen = !activeChat || activeChat.messages.length === 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        {showNewChatScreen ? <NewChatScreen /> : <ChatConversation />}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
