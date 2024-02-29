import React from 'react';

import { GAME_STATE_DRAW,GAME_STATE_PLAYING,GAME_STATE_WIN } from '../constants';
import { PLAYER_2 } from '../constants';
const Header = ({ gameState, currentPlayer, winPlayer, playWithComputer }) => {
  const renderLabel = () => {
      switch (gameState) {
          case GAME_STATE_PLAYING:
              if (playWithComputer && currentPlayer === PLAYER_2) {
                  return <div>Computer's Turn</div>;
              } else {
                  return <div>Player {currentPlayer}'s Turn</div>;
              }
          case GAME_STATE_WIN:
              if (winPlayer === PLAYER_2 && playWithComputer) {
                  return <div>Computer Wins</div>;
              } else {
                  return <div>Player {winPlayer} Wins</div>;
              }
          case GAME_STATE_DRAW:
              return <div>Game is Draw!</div>;
          default:
             
              return <><div>
                Play Connect 4
               
                </div>
              
                </>
                ;
      }
  };

  return (
      <div className="panel header">
          <div className="header-text">{renderLabel()}</div>
      </div>
  );
};



export default Header;
