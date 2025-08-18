import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { ILoginValues } from '../../shared/Interfaces';
import { useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../shared/utils/toErrorMap';
import { TogglePassword } from '../../components/TogglePassword/TogglePassword';
import { IErrors } from '../../shared/Interfaces';
import './Login.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [, executeLoginResult] = useLoginMutation();
  const [fieldType, setFieldType] = useState<string>('password');

  const initialValues: ILoginValues = {
    usernameOrEmail: '',
    password: '',
  };

  const validationSchema = Yup.object({
    usernameOrEmail: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
  });

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await executeLoginResult({
            usernameOrEmail: values.usernameOrEmail,
            password: values.password,
          });

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          } else if (response.data?.login.user) {
            navigate('/dashboard');
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, submitForm }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField
                  name="usernameOrEmail"
                  placeholder="Enter a username or email"
                  fieldErrors={errors}
                />
              </div>

              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="password"
                    placeholder="Enter a password"
                    fieldErrors={errors}
                    type={fieldType}
                  />
                  <TogglePassword errors={errors} />
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
