import React, { Component } from 'react';
import {
  getPostItNotes,
} from '../client';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      postItNotes: [],
    };
  }
  componentDidMount() {
    getPostItNotes()
      .then(response => this.setState({
        postItNotes: response,
      }))
    ;
  }
  render() {
    return (
      <div>
        <div id="adderContainer">
          <div id="adderBtn" className="post-it">
            <span>+</span>
          </div>
        </div>
        <ul id="postItNotesContainer">
          {this.state.postItNotes.map((/* object, i*/) => (
            <div>Post It Note</div>
          ))}
        </ul>
      </div>
    );
  }
}
