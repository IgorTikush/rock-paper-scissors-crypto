import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { Chat } from './styles/styles'
import './App.css';

const socket = io(`https://rock-paper-scissors-back.herokuapp.com`);
function App() {
  const [inputText, setInputText] = useState<string>('');
  const [chatText, setChatText] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setChatText([
        ...chatText,
        data,
      ]);
      console.log('messageReceive', data)
    });

    return () => {
      socket.off('message');
    }
  })

  const handleChatTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  }

  const submitChatText = (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit('message', { data: inputText });
    setInputText('');
  }

  const getChat = () => {
    return (
      <ul>
        {chatText.map((message: string, index: number) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>
    );
  }

  return (
    <div className="App">
      <Chat>
        <form onSubmit={submitChatText}>
          <input type={'text'} value={inputText} name={'chatInput'} onChange={handleChatTextChange} />
        </form>
        <div>
          {getChat()}
        </div>
      </Chat>
    </div>
  );
}

export default App;
