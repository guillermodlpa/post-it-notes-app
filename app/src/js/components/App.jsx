import React, { Component } from 'react';
import {
  getPostItNotes,
  addPostItNote,
  deletePostItNoteContent,
  editPostItNoteContentDebounced,
  editPostItNoteCoords,
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
    this.onPostItNoteSelected = this.onPostItNoteSelected.bind(this);
    this.onPostItNoteUnselected = this.onPostItNoteUnselected.bind(this);
    this.onPostItNoteDeleted = this.onPostItNoteDeleted.bind(this);
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
  onPostItNoteDeleted(postItNoteId) {
    deletePostItNoteContent(postItNoteId);

    const index = indexWhere(this.state.postItNotes, 'id', postItNoteId);

    this.setState({
      postItNotes: [
        ...this.state.postItNotes.slice(0, index),
        ...this.state.postItNotes.slice(index + 1),
      ],
    });
  }
  onPostItNoteSelected(selectedPostItNoteId) {
    this.setState({ selectedPostItNoteId });
  }
  onPostItNoteUnselected(postItNoteId) {
    if (this.state.selectedPostItNoteId === postItNoteId) {
      this.setState({ selectedPostItNoteId: null });
    }
  }

  render() {
    return (
      <div>
        <div id="adder-container">
          <button id="adder-btn" className="post-it" onClick={this.onAdderBtnClick}>
            <span>
              +
            </span>
          </button>
        </div>
        <ul>
          {this.state.postItNotes.map((object, i) => (
            <PostItNote
              key={i}
              {...object}
              isSelected={this.state.selectedPostItNoteId === object.id}
              onContentChanged={this.onContentChanged}
              onSelect={this.onPostItNoteSelected}
              onUnselect={this.onPostItNoteUnselected}
              onDelete={this.onPostItNoteDeleted}
              onCoordsChanged={(postItNoteId, x, y) => editPostItNoteCoords(postItNoteId, x, y)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
