import { MessageType, UserPublicType, UserType } from '../types';

export const isSameSenderMargin = (
  messages: MessageType[],
  m: MessageType,
  i: number,
  userId: string
) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return 'auto';
};

export const isSameSender = (
  messages: MessageType[],
  m: MessageType,
  i: number,
  userId: string
) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (
  messages: string | any[],
  i: number,
  userId: string
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (
  messages: MessageType[],
  m: MessageType,
  i: number
) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (
  loggedUser: Partial<UserType>,
  users: UserPublicType[]
) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (
  loggedUser: Partial<UserType>,
  users: UserPublicType[]
) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
