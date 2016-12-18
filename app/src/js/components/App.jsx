import React, { Component } from 'react';
import {
  getPostItNotes,
  addPostItNote,
  editPostItNoteContentDebounced,
} from '../client';
import PostItNote from './PostItNote';
import { indexWhere } from '../utils';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      postItNotes: [],
    };
    this.onAdderBtnClick = this.onAdderBtnClick.bind(this);
    this.onContentChanged = this.onContentChanged.bind(this);
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
  onContentChanged(id, content) {
    const index = indexWhere(this.state.postItNotes, 'id', id);
    const postItNote = this.state.postItNotes[index];

    postItNote.content = content;

    this.setState({
      postItNotes: [
        ...this.state.postItNotes.slice(0, index),
        postItNote,
        ...this.state.postItNotes.slice(index + 1),
      ],
    });

    editPostItNoteContentDebounced(postItNote.id, postItNote.content);
  }
  render() {
    return (
      <div>
        <div id="adder-container">
          <button id="adder-btn" className="post-it" onClick={this.onAdderBtnClick}>
            <span>+</span>
          </button>
        </div>
        <ul>
          {this.state.postItNotes.map((object, i) => (
            <PostItNote
              key={i}
              {...object}
              onContentChanged={this.onContentChanged}
            />
          ))}
        </ul>
      </div>
    );
  }
}
