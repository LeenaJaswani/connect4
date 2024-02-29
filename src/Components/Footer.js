import React from 'react';

import {
    GAME_STATE_PLAYING,
    GAME_STATE_IDLE
} from "../constants";

const Footer = ({ onNewGameClick, onNewGameWithComputerClick, gameState }) => {
  return (
      <div className="panel footer">
          {gameState === GAME_STATE_PLAYING ? (
              <>
                  <button onClick={onNewGameClick}>New Game With Friend</button>
                  <button onClick={onNewGameWithComputerClick}>New Game with Computer</button>
              </>
          ) : (
              <>
                  <button onClick={onNewGameClick}>Play With Friend</button>
                  <button onClick={onNewGameWithComputerClick}>Play with Computer</button>
              </>
          )}
      </div>
  );
};


export default Footer;