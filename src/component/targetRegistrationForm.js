import axios from 'axios';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Form as BForm, Button } from 'react-bootstrap';
import './registration.css';

export default class TargetRegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host_name: '',
      comment: '',
    };
    this.orchestratorBaseUrl = 'http://localhost:3001/v1';
  }

  handleHostNameChange(ev) {
    this.setState({ host_name: ev.target.value });
  }

  handleCommentChange(ev) {
    this.setState({ comment: ev.target.value });
  }

  registerNewTarget = async ({ host_name, comment }) => {
    const registrationResult = await axios.post(
      `${this.orchestratorBaseUrl}/targets/register`,
      {
        host: host_name,
        comment,
      },
    );

    return registrationResult.data;
  };

  render() {
    return (
      <div >
        <Formik
          initialValues={{ host_name: '', comment: '' }}
          onSubmit={
            async (values, { setSubmitting }) => {

              try {
                const targetResult = await this.registerNewTarget(values);

                alert(JSON.stringify({ values, targetResult }, null, 2));

                setSubmitting(false);

                localStorage.setItem('target', JSON.stringify(targetResult));

                this.props.hideNewTargetButton(true);
                this.props.closeModal();
              } catch (error) {
                alert(`failed to register a new target. Error: ${error}`);
                this.props.closeModal();
              } finally {
                console.debug('tgt registration form - refreshing graph data');
                await this.props.refreshGraphData();
              }
            }
          }
        >
          {({
            values,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} >
              <BForm.Label column sm='2'>
                Host:
              </BForm.Label>
              <Field
                className="label-input"
                name="host_name"
                value={values.host_name}
                type="text"
                placeholder="driver.htb"
                onChange={handleChange}
              />
              <br />
              <BForm.Label column sm='2'>
                Comment:
              </BForm.Label>
              <Field
                className="label-input"
                name="comment"
                placeholder="This is Driver from HackTheBox"
                value={values.comment}
                type="text"
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="button"
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
