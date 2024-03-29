import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Form as BForm, Button } from 'react-bootstrap';
import * as R from 'ramda';
import axios from 'axios';

import './nmapForm.css';

export default class RunNmapForm extends React.Component {
  constructor(props) {
    super(props);
    this.orchestratorBaseUrl = 'http://localhost:3001/v1';
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            port_range: '',
          }}
          onSubmit={
            async (values, { setSubmitting }) => {
              try {
                const local = localStorage.getItem('target') || '{}';
                const targetHost = R.pipe(
                  JSON.parse,
                  R.prop('uid'),
                )(local);

                const nmapRunResult = await axios.put(
                  `${this.orchestratorBaseUrl}/targets/${targetHost}`,
                  {
                    action: 'NET_SCAN',
                    options: values,
                  },
                );

                // alert(JSON.stringify({ nmapRunResult, values }, null, 2));
                console.info('successful execution of nmap --', JSON.stringify({
                  values,
                  result: nmapRunResult,
                }));
              } catch (error) {
                const errMsg = `failed to execute nmap. Error: ${error}`;
                console.error(errMsg);
                alert(JSON.stringify({ error: errMsg, values }));
              } finally {
                setSubmitting(false);
                console.debug('run nmap form - refreshing graph data');
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
            }) => (
              <Form onSubmit={handleSubmit} >
                <Field
                  name='service_version'
                  type='checkbox'
                  onChange={handleChange}
                  className='checkbox-field'
                />
                <BForm.Label>
                  Banner grabbing (-sV)
                </BForm.Label>
                <br />

                <Field
                  name='hosts_online'
                  type='checkbox'
                  onChange={handleChange}
                  className='checkbox-field'
                />
                <BForm.Label>
                  Get only hosts that are online
                </BForm.Label>
                <br />

                <Field
                  name='default_scripts'
                  type='checkbox'
                  onChange={handleChange}
                  className='checkbox-field'
                />
                <BForm.Label>
                  Default scripts (-sC)
                </BForm.Label>
                <br />

                <Field
                  name='syn_scan'
                  type='checkbox'
                  onChange={handleChange}
                  className='checkbox-field'
                />
                <BForm.Label>
                  TCP Syn Scan (-sS)
                </BForm.Label>
                <br />

                <Field
                  name='udp_scan'
                  type='checkbox'
                  onChange={handleChange}
                  className='checkbox-field'
                />
                <BForm.Label>
                  UDP Scan (-sU)
                </BForm.Label>
                <br />

                <BForm.Label>
                  Port Range:
                </BForm.Label>
                <Field
                  name='port_range'
                  type='text'
                  placeholder='22,443,80,132-443'
                  onChange={handleChange}
                  value={values.port_range}
                  className='text-field'
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
