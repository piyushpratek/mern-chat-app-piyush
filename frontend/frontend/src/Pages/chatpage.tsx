import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Chatpage = () => {
  const [chats, setChats] = useState<any[]>([]);

  const fetchChats = async () => {
    const res = await axios.get('/api/chat');
    // console.log('my chats keys', Object.keys(res.data));
    setChats(res.data.chats);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chatpage;
