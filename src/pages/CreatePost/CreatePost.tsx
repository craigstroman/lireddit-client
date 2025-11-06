import React from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { ICreatePost } from '../../shared/Interfaces';
import { useCreatePostMutation } from '../../generated/graphql';
import { Layout } from '../../components/Layout/Layout';
import './CreatePost.scss';

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [, createPost] = useCreatePostMutation();
  const initialValues: ICreatePost = {
    title: '',
    text: '',
  };
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required.'),
    text: Yup.string().required('Body is required.'),
  });
  return (
    <Layout>
      <div className="create-post-container">
        <h1>Create Post</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const response = await createPost({
              input: values,
            });

            if (response.data?.createPost) {
              navigate('/dashboard');
            }
          }}
          validationSchema={validationSchema}
        >
          {({ errors, submitForm, isSubmitting, isValid }) => {
            return (
              <Form>
                <div className="form-row">
                  <InputField name="title" placeholder="Title" fieldErrors={errors} />
                </div>

                <div className="form-row">
                  <InputField name="text" placeholder="Body..." fieldErrors={errors} textArea={true} />
                </div>
                <div className="form-row">
                  <button
                    type="submit"
                    className="button"
                    onClick={submitForm}
                    disabled={!isValid || isSubmitting}
                  >
                    Create Post
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};
