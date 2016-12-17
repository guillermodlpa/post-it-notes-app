import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      content: 'a',
    };
  }
  render() {
    return (
      <div className="shopping-list">
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
