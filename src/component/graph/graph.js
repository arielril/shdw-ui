import React from 'react';
import { Graph as RGraph } from 'react-d3-graph';

import utils from './utils';
import graphConfig from './config';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.orchestratorBaseUrl = 'http://localhost:3001/v1';
    this.state = {
      graph_config: graphConfig,
    };
  };

  nodeClick = (_, node) => {
    this.props.showFfufForm(node);
  };

  linkClick = (nodeId) => {
    alert(`link clicked: ${nodeId}`);
  };

  async componentDidMount() {
    try {
      const graphValues = await utils.getGraph();

      console.log('graph data', JSON.stringify(graphValues));
      this.setState({
        graph_data: graphValues,
      });
    } catch (error) {
      console.log('failed to get graph data. Error:', error);
    }
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'gray',
        marginBottom: '0px',
        zIndex: 1,
        overflow: 'hidden',
        position: 'fixed',
        boxSizing: 'border-box',
        border: '1px solid black',
      }} >
        <RGraph
          id='graph'
          data={this.props.graph_data}
          config={this.state.graph_config}
          onClickNode={this.nodeClick.bind(this)}
          onClickLink={this.linkClick.bind(this)}
        />
      </div>
    );
  }
};
