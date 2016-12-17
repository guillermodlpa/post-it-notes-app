import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: fill this guy.
    };
  }
  render() {
    return (
      <div>
        <div id="adderContainer">
          <div id="adderBtn" className="post-it">
            <span>+</span>
          </div>
        </div>
        <ul id="postItNotesContainer" />
      </div>
    );
  }
}
