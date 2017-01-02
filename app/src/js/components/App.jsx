import React, { Component } from 'react';
import PostItNote from './PostItNote';
import {
  getPostItNotes,
  addPostItNote,
  deletePostItNoteContent,
  editPostItNoteContentDebounced,
  editPostItNoteCoords,
} from '../client';
import {
  indexWhere,
  getRandomId,
} from '../utils';

/**
 * Main App component wrapping everything.
 */
export default class App extends Component {
  constructor() {
    super();

    // initial component state.
    this.state = {
      postItNotes: [],
      selectedPostItNoteId: null,
    };

    // binds here to avoid .bind(this) in other places.
    this.onAdderBtnClick = this.onAdderBtnClick.bind(this);
    this.onContentChanged = this.onContentChanged.bind(this);
    this.onPostItNoteSelected = this.onPostItNoteSelected.bind(this);
    this.onPostItNoteUnselected = this.onPostItNoteUnselected.bind(this);
    this.onPostItNoteDeleted = this.onPostItNoteDeleted.bind(this);
    this.onCoordsChanged = this.onCoordsChanged.bind(this);
  }
  componentDidMount() {
    getPostItNotes()
      .then(response => this.setState({
        postItNotes: response,
      }))
    ;
  }
  /**
   * Conveniency func to pass updates by post it note id.
   * @param  {string} postItNoteId
   * @param  {object} updates
   * @throws if not found.
   */
  updatePostItNoteInState(postItNoteId, updates) {
    const index = indexWhere(this.state.postItNotes, 'id', postItNoteId);
    let postItNote = this.state.postItNotes[index];
    if (!postItNote) {
      throw new Error(`Not found by id: ${postItNoteId}`);
    }

    postItNote = Object.assign({}, postItNote, updates);

    this.setState({
      postItNotes: [
        ...this.state.postItNotes.slice(0, index),
        postItNote,
        ...this.state.postItNotes.slice(index + 1),
      ],
    });
  }
  onAdderBtnClick() {
    const temporaryId = getRandomId();
    const newPostItNote = {
      id: temporaryId,
    };
    this.setState({
      postItNotes: this.state.postItNotes.concat(newPostItNote),
    });

    // Use client to add post it note, and replace temporary id when done.
    addPostItNote()
      .then((postItNote) => {
        this.updatePostItNoteInState(temporaryId, {
          id: postItNote.id,
        });
      });
  }
  onContentChanged(postItNoteId, content) {
    this.updatePostItNoteInState(postItNoteId, {
      content,
    });
    editPostItNoteContentDebounced(postItNoteId, content);
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
  onCoordsChanged(postItNoteId, x, y) {
    this.updatePostItNoteInState(postItNoteId, {
      coords: {
        x,
        y,
      },
    });
    editPostItNoteCoords(postItNoteId, x, y);
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
              onCoordsChanged={this.onCoordsChanged}
            />
          ))}
        </ul>
      </div>
    );
  }
}
