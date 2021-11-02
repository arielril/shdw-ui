import React from 'react';

export default class RunFfufForm extends React.Component {
  constructor(props) {
    super(props);
    this.orchestratorBaseUrl = 'http://localhost:3001/v1';
  }

  render() {
    return (
      <h1>Run ffuf form</h1>
    );
  }
}
