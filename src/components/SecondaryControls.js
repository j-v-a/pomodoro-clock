import React from 'react';

import { convertTime } from '../helpers/timeFunctions';

const SecondaryControls = ({ sessionDuration, breakDuration, setTime }) => {
  let sessionTime = convertTime(sessionDuration);
  let breakTime = convertTime(breakDuration);
  return (
    <div id="controls">
      <div className="control-group">
        <p id="break-label" className="control-label">
          Break length
        </p>
        <div className="control" id="break-decrement" onClick={setTime}>
          <i className="fas fa-minus-circle" />
        </div>
        <div className="control" id="break-length">
          {breakTime.minutes}
        </div>
        <div className="control" id="break-increment" onClick={setTime}>
          <i className="fas fa-plus-circle" />
        </div>
      </div>
      <div className="control-group">
        <p id="session-label" className="control-label">
          Session length
        </p>
        <div
          className="control"
          id="session-decrement"
          value="-1"
          onClick={setTime}
        >
          <i className="fas fa-minus-circle" />
        </div>
        <div className="control" id="session-length">
          {sessionTime.minutes}
        </div>
        <div
          className="control"
          id="session-increment"
          value="+1"
          onClick={setTime}
        >
          <i className="fas fa-plus-circle" />
        </div>
      </div>
    </div>
  );
};

export default SecondaryControls;
