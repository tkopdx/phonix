import React, { Component } from "react";


// const time = `30.0`;

class Stopwatch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        offset: null,
        delay: 100,
        timer: 0,
      }
    }

    componentDidMount() {
      this.reset();
    }

    componentWillUnmount() {
      if (this.state.interval) {
        clearInterval(this.state.interval);
      }
    }

    componentDidUpdate(prevProps, prevState) {

      if (this.state.timer <= 0) {
        // console.log('timer reached zero, you lose');
        this.props.gameOver();
        return;
      } 

      if (prevProps.timerState === this.props.timerState) {
        return;
      }
      
      if (this.props.timerState === 'stop') {
        // console.log('timer stop called');
        // stop the clock
        this.stop();
      } else if (this.props.timerState === 'reset') {
        // console.log('timer reset');
        // reset to full time
        this.reset();
        return;
      } else {
        // console.log('starting the clock');
        this.start();
      }
      
    }
  
    start() {
      // console.log('timer started');
      
      const loop = () => {
        let originalTime;

        if (!this.state.offset) {
          this.setState({offset: Date.now()})
        }

        if (!this.state.savedTime) {
          originalTime = this.props.timer;
        } else {
          originalTime = this.state.savedTime;
        }

        let timer, d, timeElapsed;
        d = Date.now() - this.state.offset;
        timeElapsed = (d / 1000).toFixed(1);
        timer = (originalTime - timeElapsed).toFixed(1);
        
        if (timer <= 0) {
          this.stop();
          this.setState({timer: 0});
        } else {
          this.setState({timer: timer});
        }
      };
  
      if (!this.state.interval) {
        let interval = setInterval(loop, this.state.delay);
        // console.log('timer started');
        this.setState({interval: interval});
      };
    };
  
    stop() {
      clearInterval(this.state.interval);
      this.setState({
        delay: null,
        interval: null,
        offset: null,
        savedTime: this.state.timer
      });
    }

    reset = () => {      
      let now, timer;

      timer = this.props.timer;

      now = Date.now();
      
      this.setState({
        timer: timer,
        offset: now,
        savedTime: null,
      });
    }

    render() {
      return <div className="topbar-inner-item">{this.state.timer}</div>
    }
  
}

export default React.memo(Stopwatch);