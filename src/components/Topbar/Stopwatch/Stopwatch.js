import React, { Component } from "react";

class Stopwatch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        offset: Date.now(),
        delay: 100,
        timer: `30`,
      }
    }

    componentDidMount() {
      if (this.props.playing) {
        this.start();
      } else {
        return;
      }
    }

    componentDidUpdate(prevProps) {
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
      const loop = () => {
        let timer, d, timeElapsed;
        d = Date.now() - this.state.offset;
        timeElapsed = (d / 1000).toFixed(1);
        timer = (30 - timeElapsed).toFixed(1);
        
        if (timer <= 0) {
          this.stop();
          this.setState({timer: 0});
        } else {
          this.setState({timer: timer});
        }
      };
  
      if (!this.state.interval) {
        let interval = setInterval(loop, this.state.delay);
        this.setState({interval: interval});
      };
    };
  
    stop() {
      clearInterval(this.state.interval);
      this.setState({delay: null});
    };

    render() {
      return <p>{this.state.timer}</p>
    }
  
}

export default Stopwatch;