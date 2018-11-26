import React from 'react';

import Main from './Main';
import SecondaryControls from './SecondaryControls';

class App extends React.Component {
  state = {
    timer: 1500,
    breakDuration: 300,
    sessionDuration: 1500,
    session: true,
    timerRunning: false
  };

  toggleTimer = () => {
    const {
      state: { timerRunning },
      timeDecrease
    } = this;

    if (timerRunning) {
      this.setState({ timerRunning: false });
      return;
    } else {
      this.setState(
        {
          timerRunning: true
        },
        () => window.setTimeout(timeDecrease, 1000)
      );
    }
  };

  timeDecrease = () => {
    const {
      state: { timerRunning, timer, session, breakDuration, sessionDuration },
      sound: { play },
      timeDecrease
    } = this;

    // get out of the loop when the button is clicked again
    if (!timerRunning) return;

    // when time = 0 play sound and switch session/break
    if (timer === 0) {
      play();
      if (session) {
        this.setState({
          timer: breakDuration + 1,
          session: false
        });
      } else {
        this.setState({
          timer: sessionDuration + 1,
          session: true
        });
      }
    }

    // decrease timer with 1 second
    this.setState({ timer: timer - 1 });
    // call this function again in a second
    window.setTimeout(timeDecrease, 1000);
  };

  onReset = () => {
    this.setState({
      timer: 1500,
      breakDuration: 300,
      sessionDuration: 1500,
      session: true,
      timerRunning: false
    });
    this.sound.pause();
  };

  setTime = e => {
    e.preventDefault();

    const { session, sessionDuration } = this.state;
    const { id } = e.currentTarget;
    const type = id.split('-')[0];
    const modifier = id.split('-')[1];
    let oldValue;

    if (type === 'break') {
      oldValue = this.state.breakDuration;
    } else if (type === 'session') {
      oldValue = sessionDuration;
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
    if ((session && type === 'session') || (!session && type === 'break')) {
      if (modifier === 'decrement') {
        this.setState({ timer: this.state.timer - 60 });
      } else if (modifier === 'increment') {
        this.setState({ timer: this.state.timer + 60 });
      }
    }
  };

  render() {
    const {
      state: { timer, breakDuration, sessionDuration, timerRunning, session },
      toggleTimer,
      onReset,
      setTime
    } = this;
    return (
      <div id="pomodoro">
        <Main
          timer={timer}
          timerRunning={timerRunning}
          session={session}
          toggleTimer={toggleTimer}
          onReset={onReset}
        />
        <SecondaryControls
          sessionDuration={sessionDuration}
          breakDuration={breakDuration}
          setTime={setTime}
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

export default App;
