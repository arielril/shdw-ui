import React from 'react';
import Modal from './modal';
import TargetRegistrationForm from './targetRegistrationForm';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistration: false,
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


  render() {
    return (
      <main>
        <h1>The mega CTF Helper</h1>
        <Modal show={this.state.showRegistration} handleClose={this.hideRegistrationModal} >
          <TargetRegistrationForm show={this.state.showRegistration} />
        </Modal>
        <button type="button" onClick={this.showRegistrationModal}>Register a new Target</button>
      </main>
    );
  }
}
