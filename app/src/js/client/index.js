import { apiUrl, headers } from '../config';

export function getPostItNotes() {
  return fetch(`${apiUrl}/post_it_note`, {
    method: 'get',
    headers,
  })
    .then(response => response.json())
  ;
}

export function addPostItNote(data) {
  return fetch(`${apiUrl}/post_it_note`, {
    method: 'post',
    headers,
    body: JSON.stringify(data),
  })
    .then(response => response.json())
  ;
}
