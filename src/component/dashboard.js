import React from 'react';
import { Button } from 'react-bootstrap';
import Graph from './graph';
import Modal from './modal';
import TargetRegistrationForm from './targetRegistrationForm';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistration: false,
      targetIsRegistered: false,
    };
    this.showRegistrationModal = this.showRegistrationModal.bind(this);
    this.hideRegistrationModal = this.hideRegistrationModal.bind(this);
  }

  showRegistrationModal = () => {
    this.setState({ showRegistration: true });
  };

  hideRegistrationModal = () => {
    this.setState({ showRegistration: false });
  };

  handleTargetRegistration = (result) => {
    this.setState({ targetIsRegistered: result });
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
          onClick={() => { this.setState({ targetIsRegistered: false }); }}
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
        <h1 style={{ marginLeft: '10px', marginTop: '10px' }} >Shadow Blade (SHDW)</h1>
        <Modal
          show={this.state.showRegistration}
          handleClose={this.hideRegistrationModal}
          style={{ width: '30%' }}
          title='Register a new target'
        >
          <TargetRegistrationForm handleNewTargetButton={this.handleTargetRegistration.bind(this)} />
        </Modal>
        <Graph />
      </>
    );
  }
}
