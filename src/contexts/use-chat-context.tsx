'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ChatInitialValues {
  realtime: boolean;
  chatRoom: string | undefined;
  loading: boolean;
  chats: {
    message: string;
    id: string;
    role: 'assistant' | 'user' | null;
    createdAt: Date;
    seen: boolean;
  }[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  setRealtime: Dispatch<SetStateAction<boolean>>;
  setChatRoom: Dispatch<SetStateAction<string | undefined>>;
  setChats: Dispatch<
    SetStateAction<
      {
        message: string;
        id: string;
        role: 'assistant' | 'user' | null;
        createdAt: Date;
        seen: boolean;
      }[]
    >
  >;
}

const chatInitialValues: ChatInitialValues = {
  chatRoom: undefined,
  chats: [],
  loading: false,
  realtime: false,
  setChatRoom: () => undefined,
  setChats: () => undefined,
  setLoading: () => undefined,
  setRealtime: () => undefined,
};

const ChatContext = createContext(chatInitialValues);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState(chatInitialValues.chats);
  const [loading, setLoading] = useState(chatInitialValues.loading);
  const [chatRoom, setChatRoom] = useState(chatInitialValues.chatRoom);
  const [realtime, setRealtime] = useState(chatInitialValues.realtime);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        loading,
        setLoading,
        chatRoom,
        setChatRoom,
        realtime,
        setRealtime,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
