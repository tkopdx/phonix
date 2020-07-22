import React, { Component } from "react";

class Stopwatch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        offset: Date.now(),
        delay: 100,
        timer: `45.0`,
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
      if (this.props.stageUp && prevProps.stageUp !== this.props.stageUp) {
        console.log('timer reset called');
        
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
      console.log('timer started');
      
      const loop = () => {
        let timer, d, timeElapsed;
        d = Date.now() - this.state.offset;
        timeElapsed = (d / 1000).toFixed(1);
        timer = (45 - timeElapsed).toFixed(1);
        
        if (timer <= 0) {
          this.stop();
          this.setState({timer: 0});
        } else {
          this.setState({timer: timer});
        }
      };
  
      if (!this.state.interval) {
        let interval = setInterval(loop, this.state.delay);
        console.log('timer started');
        this.setState({interval: interval});
      };
    };
  
    stop() {
      clearInterval(this.state.interval);
      this.setState({
        delay: null,
        interval: null
      });
    }

    reset = () => {      
      let now;

      now = Date.now();
      
      this.setState({
        timer: 45.0,
        offset: now
      });

      this.start();
    }

    render() {
      return <p>{this.state.timer}</p>
    }
  
}

export default Stopwatch;