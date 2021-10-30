import React from 'react';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'gray', marginBottom: '0px' }} >
        This is where the nodes will appear
      </div>
    );
  }
}
