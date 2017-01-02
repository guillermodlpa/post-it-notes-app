import React, { Component } from 'react';
import {
  getPostItNotes,
  addPostItNote,
  deletePostItNoteContent,
  editPostItNoteContentDebounced,
} from '../client';
import PostItNote from './PostItNote';
import { indexWhere } from '../utils';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      postItNotes: [],
      selectedPostItNoteId: null,
    };
    this.onAdderBtnClick = this.onAdderBtnClick.bind(this);
    this.onContentChanged = this.onContentChanged.bind(this);
    this.onNoteSelected = this.onNoteSelected.bind(this);
    this.onNoteUnselected = this.onNoteUnselected.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
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
  onContentChanged(postItNoteId, content) {
    const index = indexWhere(this.state.postItNotes, 'id', postItNoteId);
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
  onDeleteBtnClick(postItNoteId) {
    deletePostItNoteContent(postItNoteId);

    const index = indexWhere(this.state.postItNotes, 'id', postItNoteId);

    this.setState({
      postItNotes: [
        ...this.state.postItNotes.slice(0, index),
        ...this.state.postItNotes.slice(index + 1),
      ],
    });
  }

  onNoteSelected(selectedPostItNoteId) {
    this.setState({ selectedPostItNoteId });
  }
  onNoteUnselected(postItNoteId) {
    if (this.state.selectedPostItNoteId === postItNoteId) {
      this.setState({ selectedPostItNoteId: null });
    }
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
              isSelected={this.state.selectedPostItNoteId === object.id}
              onContentChanged={this.onContentChanged}
              onSelect={this.onNoteSelected}
              onUnselect={this.onNoteUnselected}
              onDeleteBtnClick={this.onDeleteBtnClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}
