import { apiUrl, headers } from '../config';

export function getPostItNotes() {
  fetch(`${apiUrl}post_it_note`, {
    method: 'get',
    headers,
  })
    .then(response => response)
  ;
}

export function newPostItNote() {

}
