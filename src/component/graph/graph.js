import React from 'react';
import { Graph as RGraph } from 'react-d3-graph';

import graphConfig from './config';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph_config: graphConfig,
      graph_data: {
        nodes: [
          {
            name: "driver.htb",
            id: "6af3afa1-31f8-4dd2-981c-7908c6a331b8",
            tags: [
              "target-host",
              "This is Writer from HackTheBox"
            ]
          },
          {
            name: "OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)",
            id: "f97adcdf-d9b6-4b4a-bf85-824298f65bbf",
            label: 22,
            tags: [
              "ssh",
              "open",
              "tcp"
            ],
          },
          {
            name: "Apache httpd 2.4.41 ((Ubuntu))",
            id: "7b014e07-2b9f-43d9-8e86-0e4f4621d556",
            label: 80,
            tags: [
              "http",
              "open",
              "tcp",
            ]
          },
        ],
        links: [
          {
            source: '6af3afa1-31f8-4dd2-981c-7908c6a331b8',
            target: 'f97adcdf-d9b6-4b4a-bf85-824298f65bbf',
            label: 22,
          },
          {
            source: '6af3afa1-31f8-4dd2-981c-7908c6a331b8',
            target: '7b014e07-2b9f-43d9-8e86-0e4f4621d556',
            label: 80,
          },
        ],
      },
    };
  };

  nodeClick = (nodeId) => {
    alert(`node clicked: ${nodeId}`);
  };

  linkClick = (nodeId) => {
    alert(`link clicked: ${nodeId}`);
  };

  render() {
    return (
      <div style={{
        width: '100%',
        height: '50%',
        backgroundColor: 'gray',
        marginBottom: '0px',
        zIndex: 1,
        overflow: 'hidden',
        position: 'fixed',
        boxSizing: 'border-box',
        // display: 'grid',
        // gridTemplateColumns: '380px 400px 1fr',
        // gridAutoRows: 'minmax(100px, auto)',
        border: '1px solid black',
      }} >
        <RGraph
          id='graph'
          data={this.state.graph_data}
          config={this.state.graph_config}
          onClickNode={this.nodeClick.bind(this)}
          onClickLink={this.linkClick.bind(this)}
        />
      </div>
    );
  }
}
