export type ContextProps = {
  selectedChat: unknown;
  setSelectedChat: unknown;
  user: Partial<UserType>;
  setUser: React.Dispatch<React.SetStateAction<Partial<UserType>>>;
  notification: unknown;
  setNotification: unknown;
  chats: Array<ChatType>;
  setChats: React.Dispatch<
    React.SetStateAction<Partial<Array<ChatType | undefined>> | undefined>
  >;
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
