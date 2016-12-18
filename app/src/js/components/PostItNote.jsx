import React, {
  Component,
  PropTypes,
} from 'react';

export default class PostItNote extends Component {
  constructor() {
    super();
    this.onContentChanged = this.onContentChanged.bind(this);
  }
  onContentChanged(event) {
    this.props.onContentChanged(this.props.id, event.target.textContent);
  }
  render() {
    return (
      <li className="post-it-note">
        <div
          className="post-it-note-content"
          contentEditable="true"
          onInput={this.onContentChanged}
          onBlur={this.onContentChanged}
        >
          {this.props.content || ''}
        </div>
        <div className="post-it-note-button post-it-note-delete">
          Delete
        </div>
      </li>
    );
  }
}

PostItNote.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string,
  onContentChanged: PropTypes.func,
};
