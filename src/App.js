
import React, { Component } from 'react'
import DictionaryBody from './componants/DictionaryBody';
import './App.css'

export default class App extends Component {

  constructor() {
    super();
    // Event binding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    // States
    this.state = {
      word: "",
      tempWord: "",
      definition: null,
      example: null,
      realWord: true
    }
  }

  // Sets the state for word
  onChangeHandler(e){
    // If the value is empty, states are defaulted to allow the "Search for a word" prompt to be shown
    if (e.target.value === "") {
      this.setState({
        definition: null,
        example: null,
        realWord: true
      })
    }
    // Sets the new word as it is entered
    this.setState({
      word: e.target.value
    })
  }

  // When the search button is clicked.
  onClickHandler(e){
    let hold = 0;
    // Stops the page refreshing
    e.preventDefault();
    // Prevents fetch if nothing is entered
    if (!(this.state.word === "")) {
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/' + this.state.word )
      .then(res => res.json())
      .then( (response) => {
        // Loops the length of meanings (returned from the Json)
        for (let index = 0; index < response[0].meanings.length; index++) {
          // Picks a noun first, if no noun is present it picks the fist avaialable definition and example
          if (response[0].meanings[index].partOfSpeech === "noun"){
            hold = index;
          }
        }
        // Not all words in this dictionary API have examples, this deals with it.
        if (!('example' in response[0].meanings[hold].definitions[0])){
          this.setState({
            example: "Example not available",
            definition: response[0].meanings[hold].definitions[0].definition,
            // Updates the state incase of a failed previous attempt to search
            realWord: true
          })
        // If there is a example, the example state is set
        }else {
          this.setState({
            example: response[0].meanings[hold].definitions[0].example,
            definition: response[0].meanings[hold].definitions[0].definition,
            // Updates the state incase of a failed previous attempt to search
            realWord: true
          })
        }
      })
      // If there is a error fetching data, realWord state is set to false (This shows the " Word not found message ")
      .catch(() => {
        this.setState({
          realWord: false,
          tempWord: this.state.word
        })
      })
    }
  }
    

  render() {
    return(
      // App body
      <div>
        <div className="App">
          <div className="inner">
            <h2>DICTIONARY</h2>
            <DictionaryBody 
              word={this.state.word} 
              realWord={this.state.realWord} 
              definition={this.state.definition} 
              example={this.state.example}
              clickFunc={this.onClickHandler}
              changeFunc={this.onChangeHandler}
              tempWord={this.state.tempWord}
            />
          </div>
        </div>
        {/* Credit stuff */}
        <div className="credits">
          <p>Created by: <a href="https://github.com/layne74" target="blank">Layne Hutchings</a></p>
          <p>Powered by: <a href="https://dictionaryapi.dev/" target="blank">https://dictionaryapi.dev/</a></p>
        </div>
      </div>
      
    )

  }
}
