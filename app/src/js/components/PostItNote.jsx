import React, {
  Component,
  PropTypes,
} from 'react';

export default class PostItNote extends Component {
  render() {
    return (
      <li className="post-it-note">
        <div className="post-it-note-content">
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
};
