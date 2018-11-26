import React from 'react';

import { convertTime, zeroPrefix } from '../helpers/timeFunctions';

const Main = ({ timer, timerRunning, session, toggleTimer, onReset }) => {
  timer = convertTime(timer);
  return (
    <div id="main">
      <div id="timer-label">{session ? 'Session' : 'Break'}</div>
      <div id="time-left">{`${zeroPrefix(timer.minutes)}:${zeroPrefix(
        timer.seconds
      )}`}</div>
      <div id="main-controls">
        <div id="start_stop" onClick={toggleTimer}>
          {timerRunning ? (
            <i className="fas fa-pause-circle" />
          ) : (
            <i className="fas fa-play-circle" />
          )}
        </div>
        <div id="reset" onClick={onReset}>
          <i className="fas fa-redo-alt" />
        </div>
      </div>
    </div>
  );
};

export default Main;
