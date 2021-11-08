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
      graph_data: {}, // graphData,
      clickedNode: {},
    };
  }

  resetEnvironment = () => {
    this.setState({
      targetIsRegistered: false,
      graph_data: { nodes: [], links: [] },
      showNmapScanForm: false,
      showFfufScanForm: false,
    });
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

  componentDidMount = () => { this.doRefreshGraphData(); };

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
            hideSelf={this.hideNmapScanModal.bind(this)}
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
            hideSelf={this.hideFfufScanModal.bind(this)}
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
