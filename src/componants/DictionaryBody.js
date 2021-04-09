import React from 'react'

export default function DictionaryBody( props ) {
  // Props deconstruction
  const {word, realWord, definition, example, clickFunc, changeFunc, tempWord} = props;

  // Based off the props, either a result, prompt or error will be returned
  function toReturn(){
      // If nothing is entered, the promp is returned
      if (definition === null && realWord === true) {
          return (
            <div>
              <h3>Search for a word!</h3>
            </div>
          )
      // If the word has been found, it is returned
      } else if (realWord === true) {
          return (
            <div>
              <h3>Definition:</h3>
              <p>{definition}</p>
              <h3>Example:</h3>
              <p>{example}</p>
            </div>
          )
      // If the word has not been found a error is displayed
      } else {
          // Creates a link so the user can quickly google what they are looking for
          const googleLink = "https://www.google.co.za/search?q=" + tempWord + " definition"
          return (
            <div>
              <h3>Hmm... I cant seem to find that word. Try <a href={googleLink} target="blank">google</a> it.</h3>
            </div>
          )
      }
  }

  return (
      <div>
          <form onSubmit={clickFunc}>
                <input onChange={changeFunc} value={word} placeholder="Enter a word" required></input><br></br>
                <button type="submit">Search</button>
          </form>
          {toReturn()}
      </div>
  )
    
}
