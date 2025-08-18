import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { IChangePassword } from '../../shared/Interfaces';
import { TogglePassword } from '../../components/TogglePassword/TogglePassword';
import './ChangePassword.scss';

// TODO: Continue creating change password page

export const ChangePassword: React.FC = () => {
  const [fieldTypeOne, setFieldTypeOne] = useState<string>('password');
  const [fieldTypeTwo, setFieldTypeTwo] = useState<string>('password');
  const { token } = useParams();
  const initialValues: IChangePassword = {
    newPassword: '',
  };
  const validationSchema = Yup.object({
    new_password: Yup.string()
      .required('Password is required.')
      .min(6, 'Password must be at least 6 characters long.')
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, 'Password must special characters.'),
  });
  console.log('token: ', token);

  const handleToggleFieldOne = (data: string) => {
    setFieldTypeOne(data);
  };

  const handleToggleFieldTwo = (data: string) => {
    setFieldTypeTwo(data);
  };

  return (
    <div className="change-password-container">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          console.log('onSubmit: ');
        }}
        validationSchema={validationSchema}
      >
        {({ errors }) => {
          return (
            <Form>
              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="newPassword"
                    placeholder="Enter a password"
                    fieldErrors={errors}
                    type={fieldTypeOne}
                  />
                  <TogglePassword errors={errors} onSendValue={handleToggleFieldOne} />
                </div>
              </div>
              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="passwordConfirmation"
                    placeholder="Enter password confirmation"
                    fieldErrors={errors}
                    type={fieldTypeTwo}
                  />
                  <TogglePassword errors={errors} onSendValue={handleToggleFieldTwo} />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
