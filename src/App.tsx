import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

import { Chat } from './styles/styles'
import './App.css';
import { GameScreen } from './game-screen/game.screen';
import { Injected } from './web3/connectors';


// const socket = io(`https://rock-paper-scissors-back.herokuapp.com`);
const socket = io(`http://localhost:3000`);
function App() {
  const [inputText, setInputText] = useState<string>('');
  const [chatText, setChatText] = useState<string[]>([]);
  const [screen, setScreen] = useState<string>('main');
  const [roomName, setRoomName] = useState<string>('');

  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account } = useWeb3React();

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setChatText([
        ...chatText,
        data,
      ]);
    });

    socket.on('gameReady', ({ room }) => {
      console.log(room);
      // console.log('SecondPlayer connected');
      setRoomName(room);
      setScreen('game');
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

  const createRoom = () => {
    socket.emit('checkRooms', 'room1');
  }

  if (screen === 'game') {
    return <GameScreen
      socket={socket}
      roomName={roomName}
    />
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
      <button onClick={createRoom}>
        Find opponent
      </button>
      <button onClick={() => activate(Injected)}>
        connect wallet
      </button>
      {chainId}
    </div>
  );
}

export default App;
