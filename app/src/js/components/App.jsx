import React, { Component } from 'react';
import {
  getPostItNotes,
  addPostItNote,
} from '../client';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      postItNotes: [],
    };
    this.onAdderBtnClick = this.onAdderBtnClick.bind(this);
  }
  componentDidMount() {
    getPostItNotes()
      .then(response => this.setState({
        postItNotes: response,
      }))
    ;
  }
  onAdderBtnClick() {
    addPostItNote();

    const newPostItNote = {};
    this.setState({
      postItNotes: this.state.postItNotes.concat(newPostItNote),
    });
  }
  render() {
    return (
      <div>
        <div id="adder-container">
          <button id="adder-btn" className="post-it" onClick={this.onAdderBtnClick}>
            <span>+</span>
          </button>
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
