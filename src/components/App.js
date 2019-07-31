import React, {Component} from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Container from './Container';
import images from '../images';

class App extends Component {
  state = {
    score: 0,
    highScore: 0,

    // for assigning class to navMessage based on success/failure
    navMsg: '',

    // for player feedback (welcome, success, failure)
    navMessage: 'Mulder is out there... Click one to begin!',

    allCharacters: this.shuffleArray(),

    // for tracking clicked elements
    wasClicked: [],
  };

  clickEvent = this.checkClicked.bind(this);

  // for shuffling images on load + on click
  shuffleArray() {
    // for new array of characters
    const newArr = images.slice();
    // for storing shuffled array
    const shuffleArr = [];

    while (newArr.length > 0) {
      shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
    }
    return shuffleArr;
  }

  checkClicked(clickedElement) {
    const prevState = this.state.wasClicked.slice();
    const shuffled = this.shuffleArray();

    // for tracking score
    let score = this.state.score;
    let highScore = this.state.highScore;

    // if clicked element was not clicked, increase score
    if (!this.state.wasClicked.includes(clickedElement)) {
      if(score === highScore) {
        score++;
        highScore++;
      } else {
        score++;
      }
      prevState.push(clickedElement);
    }

    if (this.state.wasClicked.includes(clickedElement)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsg: 'incorrect',
        navMessage: 'Wrong! The truth is out there...',
        allCharacters: shuffled,
        wasClicked: [],
      });
    }

    this.setState({
      score: score,
      highScore: highScore,
      navMsg: 'correct',
      navMessage: 'Correct! We want to believe... in you!',
      allCharacters: shuffled,
      wasClicked: prevState,
    });
      return setTimeout(() => this.setState({ navMsg: '' }), 500);
    }
    render() {
      const state = this.state;
      return (
        <div>
          <Navbar
            score={state.score}
            highScore={state.highScore}
            navMessage={state.navMessage}
            navMsg={state.navMsg}
          />
          <Banner />
          <Container
            characters={state.allCharacters}
            clickEvent={this.clickEvent}
          />
        </div>
    );
  }
}

export default App;
