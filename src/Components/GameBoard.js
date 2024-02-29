import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GameCircle from "./GameCircle";
import { isDraw, isWinner, getComputerMove } from "../helper";
import {
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    GAME_STATE_DRAW,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2,
    GAME_STATE_IDLE,
    NO_CIRCLES,
} from "../constants";

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_IDLE);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);
    const [playWithComputer, setPlayWithComputer] = useState(false);

    useEffect(() => {
      let timeout;
      if (playWithComputer && currentPlayer === PLAYER_2 && gameState === GAME_STATE_PLAYING) {
          timeout = setTimeout(() => {
              const computerMove = getComputerMove(gameBoard);
              handleMove(computerMove);
          }, 1000); 
      }
      return () => clearTimeout(timeout); 
  }, [currentPlayer, gameBoard, gameState, playWithComputer]);
  
  const onNewGameClick = () => {
    initGame(false); 
};

const onNewGameWithComputerClick = () => {
    initGame(true); 
};


 const initGame = (vsComputer = false) => {
    setCurrentPlayer(PLAYER_1);
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setGameState(GAME_STATE_PLAYING);
    setWinPlayer(NO_PLAYER);
    setPlayWithComputer(vsComputer); 
};


    const handleMove = (id) => {
        if (gameBoard[id] !== NO_PLAYER || gameState !== GAME_STATE_PLAYING) return;

        const newGameBoard = gameBoard.map((piece, index) => {
            return index === id ? currentPlayer : piece;
        });

        if (isWinner(newGameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        } else if (isDraw(newGameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
        } else {
            setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        }

        setGameBoard(newGameBoard);
    };

    const renderCircle = (id) => {
        return (
            <GameCircle
                key={id}
                id={id}
                className={`player_${gameBoard[id]}`}
                onCircleClicked={() => handleMove(id)}
            />
        );
    };

    const initBoard = () => gameBoard.map((_, i) => renderCircle(i));

    return (
        <>
     <Header
    gameState={gameState}
    currentPlayer={currentPlayer}
    winPlayer={winPlayer}
    playWithComputer={playWithComputer}
/>

        {gameState !== GAME_STATE_IDLE && ( 
            <div className="gameBoard">{initBoard()}</div>
        )}
      <Footer
    onNewGameClick={() => initGame(false)}
    onNewGameWithComputerClick={() => initGame(true)}
    gameState={gameState}
/>

    </>
    );
};

export default GameBoard;
