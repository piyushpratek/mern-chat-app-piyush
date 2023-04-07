export type ContextProps = {
  selectedChat: Partial<ChatType>;
  setSelectedChat: React.Dispatch<
    React.SetStateAction<Partial<ChatType> | undefined>
  >;
  user: Partial<UserType>;
  setUser: React.Dispatch<React.SetStateAction<Partial<UserType> | undefined>>;
  notification: NotificationType[];
  setNotification: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  chats: Array<ChatType>;
  setChats: React.Dispatch<React.SetStateAction<Array<ChatType> | undefined>>;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
};
export type UserTypeAdditional = {
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type UserPublicType = Omit<UserType & UserTypeAdditional, 'token'>;

export type ChatType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: Array<UserPublicType>;
  groupAdmin: UserPublicType;
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage: {
    _id: string;
    sender: UserPublicType;
    content: string;
    chat: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export type NotificationType = {
  _id: string;
  chat: ChatType;
};

export type MessageType = {
  _id: string;
  sender: Omit<UserType, 'token'>;
  content: string;
  chat: {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    latestMessage: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};
