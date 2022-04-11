import React, { FC, useEffect, useState } from 'react';

import { IGameOver } from './interfaces/socket.interfaces';

declare interface IGameScreen {
  socket: any;
  roomName: string;
}

export const GameScreen: FC<IGameScreen> = (props) => {
  const [gameStatus, setGameStatus] = useState<{ status: string, winner?: string }>({ status: '' });

  useEffect(() => {
    props.socket.on('gameResult', (data: IGameOver) => {
      console.log(data);
      setGameStatus({
        status: data.status,
        winner: data.winner,
      });
    });
  }, []);

  const sendMove = (event: any) => {
    const move = event.target.innerText.toLowerCase();
    props.socket.emit('makeMove', { roomName: props.roomName, move });
  }

  if (gameStatus.status === 'win') {
    return (
      <>
        {props.socket.id}
      </>
    );
  }

  if (gameStatus.status === 'draw') {
    return (
      <>
        Draw
      </>
    );
  }

  return (
    <div>
      <button onClick={sendMove}>Rock</button>
      <button onClick={sendMove}>Paper</button>
      <button onClick={sendMove}>Scissors</button>
    </div>
  );
}
