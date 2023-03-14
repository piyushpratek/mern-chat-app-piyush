//Todo- update types for notification,setnotification
export type ContextProps = {
  selectedChat: Partial<ChatType>;
  setSelectedChat: React.Dispatch<
    React.SetStateAction<Partial<ChatType> | undefined>
  >;
  user: Partial<UserType>;
  setUser: React.Dispatch<React.SetStateAction<Partial<UserType> | undefined>>;
  notification: unknown;
  setNotification: unknown;
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
};
