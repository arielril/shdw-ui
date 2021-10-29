import React from 'react';
import { Formik, Form, Field } from 'formik';
import './registration.css';

export default class TargetRegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host_name: '',
      comment: '',
    };
  }

  handleHostNameChange(ev) {
    this.setState({ host_name: ev.target.value });
  }

  handleCommentChange(ev) {
    this.setState({ comment: ev.target.value });
  }

  render() {
    return (
      <div style={{ border: '3px solid black' }} >
        <header className="header">Register a new target</header>
        <Formik
          initialValues={{ host_name: '', comment: '' }}
          onSubmit={
            async (values, { setSubmitting }) => {
              await new Promise(resolve => setTimeout(resolve, 500));
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }
          }
        >
          {({
            values,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} >
              <div />
              <br />
              <label className="label" style={{ paddingRight: '42px' }}>Host:</label>
              <Field
                className="label-input"
                name="host_name"
                value={values.host_name}
                type="text"
                placeholder="driver.htb"
                onChange={handleChange}
              />
              <br />
              <label className="label">Comment:</label>
              <Field
                className="label-input"
                name="comment"
                placeholder="This is Driver from HackTheBox"
                value={values.comment}
                type="text"
                onChange={handleChange}
              />
              <div />
              <br />
              <button
                type="submit"
                className="button"
                disabled={isSubmitting}
              >
                Register
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
