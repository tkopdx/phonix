import React, { Component } from "react";


const time = `30.0`;

class Stopwatch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        offset: Date.now(),
        delay: 100,
        timer: time,
      }
    }

    componentDidMount() {
      if (this.props.playing) {
        this.start();
      } else {
        return;
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.playing && this.state.timer === 0) {
        this.props.gameOver();

        return;
      }
      
      if (this.props.stageUp && prevProps.stageUp !== this.props.stageUp) {
        // console.log('timer reset called');
        
        // stop the clock
        this.stop();
      }

      if (this.props.restart && this.props.restart !== prevProps.restart) {
        
        
        // reset to full time
        this.reset();
      }
      
      if (prevProps.playing === this.props.playing) {
        return;
      } else {
        if (this.props.playing) {
          this.start();
        } else {
          this.stop();
        }
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
          originalTime = time;
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
      let now;

      now = Date.now();
      
      this.setState({
        timer: time,
        offset: now,
        savedTime: null,
      });

      this.start();
    }

    render() {
      return <div className="topbar-inner-item">{this.state.timer}</div>
    }
  
}

export default Stopwatch;