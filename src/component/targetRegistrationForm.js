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
      `${this.orchestratorBaseUrl}/target/register`,
      {
        host: host_name,
        comment,
      },
    );

    console.log('##>> registration result >>', JSON.stringify(registrationResult, null, 2));
  };

  render() {
    return (
      <div >
        <Formik
          initialValues={{ host_name: '', comment: '' }}
          onSubmit={
            async (values, { setSubmitting }) => {

              // const targetResult = await this.registerNewTarget(values);

              const targetResult = await new Promise(resolve => setTimeout(resolve({
                uid: '72BADEDD-A00A-47C6-8E22-79F1FA34409D',
              }), 500));
              alert(JSON.stringify({ values, targetResult }, null, 2));

              setSubmitting(false);

              localStorage.setItem('target', JSON.stringify(targetResult));

              this.props.hideNewTargetButton(true);
              this.props.closeModal();
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
