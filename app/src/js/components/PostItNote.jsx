import React, {
  Component,
  PropTypes,
} from 'react';

export default class PostItNote extends Component {
  constructor() {
    super();
    this.onContentChanged = this.onContentChanged.bind(this);
    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);
  }
  onContentChanged(event) {
    this.props.onContentChanged(this.props.id, event.target.textContent);
  }

  select() {
    this.props.onSelect(this.props.id);
  }
  unselect() {
    this.props.onUnselect(this.props.id);
  }

  render() {
    const isSelected = this.props.isSelected;
    const className = `post-it-note${isSelected ? ' is-selected' : ''}`;

    return (
      <li
        className={className}
        onMouseEnter={this.select}
        onMouseLeave={this.unselect}
        onClick={this.select}
      >
        <div
          className="post-it-note-content"
          contentEditable="true"
          onInput={this.onContentChanged}
          onBlur={this.onContentChanged}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: this.props.content || '' }}
        />
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
  isSelected: PropTypes.bool,
  onContentChanged: PropTypes.func,
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
};
