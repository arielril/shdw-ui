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
  }

  handleHostNameChange(ev) {
    this.setState({ host_name: ev.target.value });
  }

  handleCommentChange(ev) {
    this.setState({ comment: ev.target.value });
  }

  render() {
    return (
      <div >
        <Formik
          initialValues={{ host_name: '', comment: '' }}
          onSubmit={
            async (values, { setSubmitting }) => {
              await new Promise(resolve => setTimeout(resolve, 500));
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              this.props.handleNewTargetButton(true);
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
