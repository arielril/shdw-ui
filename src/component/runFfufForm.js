import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Form as BForm, Button } from 'react-bootstrap';
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import axios from 'axios';
import * as R from 'ramda';

export default class RunFfufForm extends React.Component {
  constructor(props) {
    super(props);
    this.orchestratorBaseUrl = 'http://localhost:3001/v1';
  }

  // componentDidMount = () => {
  //   console.log('ffuf form - received node -->', JSON.stringify(this.props.clickedNode || {}));
  // };

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            ignore_status: [],
          }}
          onSubmit={
            async (values, { setSubmitting }) => {
              try {
                const local = localStorage.getItem('target') || '{}';
                const targetHost = R.pipe(
                  JSON.parse,
                  R.prop('uid'),
                )(local);

                const ffufRunResult = await axios.put(
                  `${this.orchestratorBaseUrl}/targets/${targetHost}`,
                  {
                    action: 'WEB_PATH_DISCOVERY',
                    options: {
                      ...values,
                      start_node: {
                        uid: R.path(['clickedNode', 'uid'], this.props),
                        port: R.path(['clickedNode', 'port'], this.props),
                      }
                    },
                  },
                );

                console.info('successful execution of ffuf --', JSON.stringify({
                  values,
                  result: ffufRunResult,
                }));
              } catch (error) {
                const errMsg = `failed to execute ffuf. Error: ${error}`;
                console.error(errMsg);
                alert(JSON.stringify({
                  error: errMsg,
                  values,
                }));
              } finally {
                setSubmitting(false);
                this.props.refreshGraphData();
                this.props.hideSelf();
              }
            }
          }
        >
          {
            ({
              values,
              handleSubmit,
              handleChange,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit} >
                <Field
                  name='recursion'
                  type='checkbox'
                  onChange={handleChange}
                  className='checkbox-field'
                />
                <BForm.Label>
                  Path Recursion
                </BForm.Label>
                <br />

                <Field
                  name='redirect'
                  type='checkbox'
                  onChange={handleChange}
                  className='checkbox-field'
                />
                <BForm.Label>
                  Follow Redirect (301 HTTP Status)
                </BForm.Label>
                <br />

                <BForm.Label>
                  Ignore HTTP status code (-fc)
                </BForm.Label>
                {/* Ignore status */}
                {/* https://codesandbox.io/s/9jl3722xjw?file=/src/index.js */}
                <TagsInput
                  name='ignore_status'
                  value={values.ignore_status}
                  onChange={(is) => {
                    const ignore_list = is.map(Number);
                    console.log('ignore status', ignore_list);
                    setFieldValue('ignore_status', ignore_list);
                  }}
                />
                <br />

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  variant='success'
                >
                  Run
                </Button>
              </Form>
            )
          }
        </Formik>
      </div>
    );
  }
}
