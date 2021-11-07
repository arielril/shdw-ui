import React from 'react';
import { Button } from 'react-bootstrap';

import Graph from './graph/graph';
import Modal from './modal';
import RunNmapForm from './runNmapForm';
import TargetRegistrationForm from './targetRegistrationForm';
import graphUtils from './graph/utils';
import RunFfufForm from './runFfufForm';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistration: false,
      targetIsRegistered: false,
      showNmapScanForm: false,
      showFfufScanForm: false,
      graph_data: graphData,
      clickedNode: {},
    };
  }

  resetEnvironment = () => {
    this.setState({ targetIsRegistered: false });
    localStorage.removeItem('target');
  };

  showRegistrationModal = () => {
    this.setState({ showRegistration: true });
  };

  hideRegistrationModal = () => {
    this.setState({ showRegistration: false });
  };

  hideTargetRegistration = (result) => {
    this.setState({ targetIsRegistered: result });
  };

  showNmapScanModal = () => { this.setState({ showNmapScanForm: true }); };
  hideNmapScanModal = () => { this.setState({ showNmapScanForm: false }); };

  showFfufScanModal = (clickedNode) => {
    this.setState({
      showFfufScanForm: true,
      clickedNode,
    });
  };
  hideFfufScanModal = () => {
    this.setState({
      showFfufScanForm: false,
      clickedNode: {},
    });
  };

  doRefreshGraphData = async () => {
    try {
      const graphValues = await graphUtils.getGraph();

      console.log('graph data', JSON.stringify(graphValues));
      this.setState({
        graph_data: graphValues,
      });
    } catch (error) {
      console.log('failed to get graph data. Error:', error);
    }
  };

  render() {
    return (
      <>
        <Button
          style={{
            float: 'right',
            marginRight: '10px',
            marginTop: '10px',
          }}
          type="button"
          onClick={this.resetEnvironment}
          variant="danger"
        >
          Reset
        </Button>
        <Button
          style={{
            float: 'right',
            marginRight: '10px',
            marginTop: '10px',
          }}
          hidden={this.state.targetIsRegistered}
          type="button"
          variant="success"
          onClick={this.showRegistrationModal}>
          Register a new Target
        </Button>
        <Button
          style={{
            float: 'right',
            marginRight: '10px',
            marginTop: '10px',
          }}
          hidden={!this.state.targetIsRegistered}
          type="button"
          variant="warning"
          onClick={this.showNmapScanModal}>
          Run Nmap Scan on target
        </Button>
        <h1 style={{ marginLeft: '10px', marginTop: '10px' }} >Shadow Blade (SHDW)</h1>
        <Modal
          show={this.state.showRegistration}
          handleClose={this.hideRegistrationModal}
          title='Register a new target'
          animation={false}
        >
          <TargetRegistrationForm
            hideNewTargetButton={this.hideTargetRegistration.bind(this)}
            closeModal={this.hideRegistrationModal.bind(this)}
            refreshGraphData={this.doRefreshGraphData.bind(this)}
          />
        </Modal>
        <Modal
          show={this.state.showNmapScanForm}
          handleClose={this.hideNmapScanModal}
          title='Nmap Options'
          animation={false}
        >
          <RunNmapForm
            refreshGraphData={this.doRefreshGraphData.bind(this)}
          />
        </Modal>
        <Modal
          show={this.state.showFfufScanForm}
          handleClose={this.hideFfufScanModal}
          title='Ffuf Options'
        >
          <RunFfufForm
            refreshGraphData={this.doRefreshGraphData.bind(this)}
            clickedNode={this.state.clickedNode}
          />
        </Modal>
        <Graph
          executeRefreshGraphData={this.doRefreshGraphData.bind(this)}
          showFfufForm={this.showFfufScanModal.bind(this)}
          graph_data={this.state.graph_data}
        />
      </>
    );
  }
}


const graphData = {
  "nodes": [
    {
      "name": "secret.htb",
      "uid": "b93857ab-c04d-45c1-864d-74202d77cec8",
      "tags": [
        "target-host",
        "This is Secret from HackTheBox"
      ],
      "id": "b93857ab-c04d-45c1-864d-74202d77cec8"
    },
    {
      "name": "nginx 1.18.0 (Ubuntu)",
      "uid": "ed3affb0-a37c-42d8-ac95-833767fbf58b",
      "port": 80,
      "tags": [
        "http",
        "open",
        "tcp"
      ],
      "id": "ed3affb0-a37c-42d8-ac95-833767fbf58b"
    },
    {
      "name": "Node.js (Express middleware)",
      "uid": "d6d651e2-7630-4892-a144-338d8b85c217",
      "port": 3000,
      "tags": [
        "http",
        "open",
        "tcp"
      ],
      "id": "d6d651e2-7630-4892-a144-338d8b85c217"
    },
    {
      "name": "OpenSSH 8.2p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)",
      "uid": "156fbfcc-5d9f-4b6e-bbda-88986ff76ba3",
      "port": 22,
      "tags": [
        "ssh",
        "open",
        "tcp"
      ],
      "id": "156fbfcc-5d9f-4b6e-bbda-88986ff76ba3"
    }
  ],
  "links": [
    {
      "source": "b93857ab-c04d-45c1-864d-74202d77cec8",
      "target": "ed3affb0-a37c-42d8-ac95-833767fbf58b",
      "label": "lb=80; wg=50"
    },
    {
      "source": "b93857ab-c04d-45c1-864d-74202d77cec8",
      "target": "d6d651e2-7630-4892-a144-338d8b85c217",
      "label": "lb=3000; wg=50"
    },
    {
      "source": "b93857ab-c04d-45c1-864d-74202d77cec8",
      "target": "156fbfcc-5d9f-4b6e-bbda-88986ff76ba3",
      "label": "lb=22; wg=50"
    }
  ]
};

