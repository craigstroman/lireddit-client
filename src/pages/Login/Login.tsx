import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { ILoginValues } from '../../shared/Interfaces';
import { useLoginMutation } from '../../generated/graphql';
import './Login.scss';

export const Login: React.FC = () => {
  const [, executeLoginResult] = useLoginMutation();
  const [fieldType, setFieldType] = useState<string>('password');
  const [icon, setIcon] = useState<IconDefinition>(faEyeSlash);
  const [iconLabel, setIconLabel] = useState<string>('Hide password');

  const initialValues: ILoginValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
  });

  const togglePasswordView = () => {
    if (fieldType === 'password') {
      setIcon(faEye);
      setFieldType('text');
      setIconLabel('Show password');
    } else {
      setIcon(faEyeSlash);
      setFieldType('password');
      setIconLabel('Hide password');
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const response = await executeLoginResult({
            username: values.username,
            password: values.password,
          });

          console.log('response: ', response);
        }}
        validationSchema={validationSchema}
      >
        {({ errors, submitForm }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField name="username" placeholder="Enter a username" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="password"
                    placeholder="Enter a password"
                    fieldErrors={errors}
                    type={fieldType}
                  />
                  <div className={errors ? 'toggle-password error' : 'toggle-password'}>
                    <FontAwesomeIcon
                      icon={icon}
                      className="icon"
                      onClick={togglePasswordView}
                      aria-label={iconLabel}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <button type="submit" className="button" onClick={submitForm}>
                  Login
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
