import React from 'react';

/* Helper functions */

// converts seconds to a 'time object', i.e. {minutes: 08, seconds: 04}.
function convertTime(seconds) {
  let timeObj = {};
  timeObj.minutes = Math.floor(seconds / 60);
  timeObj.seconds = seconds - timeObj.minutes * 60;

  return timeObj;
}

// helper to convert a positive 1 or 2 digit 'time' number to a 2 digit string
function zeroPrefix(number) {
  if (number < 0) return '00';
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

/* Pomodoro app */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 1500,
      breakDuration: 300,
      sessionDuration: 1500,
      session: true,
      timerRunning: false
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.timeDecrease = this.timeDecrease.bind(this);
    this.onReset = this.onReset.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  toggleTimer() {
    if (this.state.timerRunning) {
      this.setState({ timerRunning: false });
      return;
    } else {
      this.setState(
        {
          timerRunning: true
        },
        () => window.setTimeout(this.timeDecrease, 1000)
      );
    }
  }

  timeDecrease() {
    // get out of the loop when the button is clicked again
    if (!this.state.timerRunning) return;

    // when time = 0 play sound and switch session/break
    if (this.state.timer === 0) {
      this.sound.play();
      if (this.state.session) {
        this.setState({
          timer: this.state.breakDuration + 1,
          session: false
        });
      } else {
        this.setState({
          timer: this.state.sessionDuration + 1,
          session: true
        });
      }
    }

    // decrease timer with 1 second
    this.setState({ timer: this.state.timer - 1 });
    // call this function again in a second
    window.setTimeout(this.timeDecrease, 1000);
  }

  onReset() {
    this.setState({
      timer: 1500,
      breakDuration: 300,
      sessionDuration: 1500,
      session: true,
      timerRunning: false
    });
    this.sound.pause();
    this.sound.currentTime = 0;
  }

  setTime(e) {
    e.preventDefault();
    const type = e.currentTarget.id.split('-')[0];
    const modifier = e.currentTarget.id.split('-')[1];
    let oldValue;
    if (type === 'break') {
      oldValue = this.state.breakDuration;
    } else if (type === 'session') {
      oldValue = this.state.sessionDuration;
    }

    // restrict input
    if (oldValue <= 60 || oldValue > 3540) {
      return;
    }

    // handle break/session durations
    if (modifier === 'decrement') {
      this.setState({ [type + 'Duration']: oldValue - 60 });
    } else if (modifier === 'increment') {
      this.setState({ [type + 'Duration']: oldValue + 60 });
    }

    // handle timer
    if (
      (this.state.session && type === 'session') ||
      (!this.state.session && type === 'break')
    ) {
      if (modifier === 'decrement') {
        this.setState({ timer: this.state.timer - 60 });
      } else if (modifier === 'increment') {
        this.setState({ timer: this.state.timer + 60 });
      }
    }
  }

  render() {
    const {
      timer,
      breakDuration,
      sessionDuration,
      timerRunning,
      session
    } = this.state;
    return (
      <div id="pomodoro">
        <Main
          timer={timer}
          timerRunning={timerRunning}
          session={session}
          toggleTimer={this.toggleTimer}
          onReset={this.onReset}
        />
        <SecondaryControls
          sessionDuration={sessionDuration}
          breakDuration={breakDuration}
          setTime={this.setTime}
        />
        <audio
          id="beep"
          preload="auto"
          src="https://notificationsounds.com/soundfiles/35051070e572e47d2c26c241ab88307f/file-74_bells-message.mp3"
          ref={a => {
            this.sound = a;
          }}
        />
      </div>
    );
  }
}

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

export default App;
