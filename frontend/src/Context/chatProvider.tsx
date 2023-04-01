import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatType, ContextProps, UserType } from '../types';

const ChatContext = createContext<Partial<ContextProps>>({});

const ChatProvider = ({ children }: any) => {
  const [user, setUser] = useState<Partial<UserType>>();
  const [selectedChat, setSelectedChat] = useState<Partial<ChatType>>();
  const [chats, setChats] = useState<Array<ChatType>>();
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    setUser(userInfo);

    if (!userInfo) {
      navigate('/');
    }
  }, []);
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
