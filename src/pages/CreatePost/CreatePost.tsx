import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { ICreatePost } from '../../shared/Interfaces';
import './CreatePost.scss';

export const CreatePost: React.FC = () => {
  const initialValues: ICreatePost = {
    title: '',
    text: '',
  };
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required.'),
    text: Yup.string().required('Body is required.'),
  });
  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {}}
        validationSchema={validationSchema}
      >
        {({ errors, submitForm }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField name="title" placeholder="Title" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <div className="password-input-container">
                  <InputField name="text" placeholder="Body..." fieldErrors={errors} />
                </div>
              </div>
              <div className="form-row">
                <button type="submit" className="button" onClick={submitForm}>
                  Login
                </button>
              </div>
              <div className="form-row">
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </a>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
