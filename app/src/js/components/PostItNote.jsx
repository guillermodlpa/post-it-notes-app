import React, {
  Component,
  PropTypes,
} from 'react';
import Draggable from 'react-draggable';

export default class PostItNote extends Component {
  constructor() {
    super();
    this.onContentChanged = this.onContentChanged.bind(this);
    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);
    this.delete = this.delete.bind(this);
    this.onDraggableStop = this.onDraggableStop.bind(this);
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
  delete() {
    this.props.onDelete(this.props.id);
  }
  onDraggableStop(event, data) {
    this.props.onCoordsChanged(
      this.props.id,
      data.x,
      data.y,
    );
  }

  render() {
    const isSelected = this.props.isSelected;
    const className = `post-it-note${isSelected ? ' is-selected' : ''}`;

    return (
      <Draggable
        axis="both"
        handle=""
        grid={[25, 25]}
        zIndex={100}
        defaultPosition={this.props.coords}
        onStop={this.onDraggableStop}
      >
        <li
          className="post-it-note-wrap"
        >
          <div
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
            <button
              className="post-it-note-button post-it-note-delete"
              onClick={this.delete}
            >
              Delete
            </button>
          </div>
        </li>
      </Draggable>
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
  onDelete: PropTypes.func,
  onCoordsChanged: PropTypes.func,
  coords: PropTypes.objectOf(React.PropTypes.number),
};
