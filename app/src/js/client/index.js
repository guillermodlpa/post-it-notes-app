import debounce from 'debounce';
import { apiUrl, headers } from '../config';

function getItemWithoutUnderscoreId(item) {
  /* eslint-disable no-underscore-dangle */
  const newItem = Object.assign({}, item);
  newItem.id = newItem._id;
  delete newItem._id;
  return newItem;
  /* eslint-enable no-underscore-dangle */
}

export function getPostItNotes() {
  return fetch(`${apiUrl}/post_it_note`, {
    method: 'GET',
    headers,
  })
    .then(response => response.json())
    .then(response => (response.map(item => getItemWithoutUnderscoreId(item))))
  ;
}

export function addPostItNote(data) {
  return fetch(`${apiUrl}/post_it_note`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
    .then(response => response.json())
  ;
}

export function editPostItNoteContent(id, newContent) {
  return fetch(`${apiUrl}/post_it_note/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      content: newContent,
    }),
  })
    .then(response => response.json())
  ;
}

export function deletePostItNoteContent(id) {
  return fetch(`${apiUrl}/post_it_note/${id}`, {
    method: 'DELETE',
    headers,
  })
    .then(response => response.json())
  ;
}

export const editPostItNoteContentDebounced = debounce(editPostItNoteContent, 350);

