import React from 'react';
import { Button } from 'react-bootstrap';
import CustomNode from './graph/customNode';
import Graph from './graph/graph';
import Modal from './modal';
import RunNmapForm from './runNmapForm';
import TargetRegistrationForm from './targetRegistrationForm';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistration: false,
      targetIsRegistered: false,
      showNmapScanForm: false,
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
          />
        </Modal>
        <Modal
          show={this.state.showNmapScanForm}
          handleClose={this.hideNmapScanModal}
          title='Nmap Options'
          animation={false}
        >
          <RunNmapForm />
        </Modal>
        <Graph />
        {/* <CustomNode node={{
          name: "driver.htb",
          id: "6af3afa1-31f8-4dd2-981c-7908c6a331b8",
          tags: [
            "target-host",
            "This is Writer from HackTheBox"
          ]
        }} /> */}
      </>
    );
  }
}
