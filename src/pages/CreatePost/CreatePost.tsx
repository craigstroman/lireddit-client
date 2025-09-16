import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { ICreatePost } from '../../shared/Interfaces';
import { useCreatePostMutation } from '../../generated/graphql';
import { Layout } from '../../components/Layout/Layout';
import './CreatePost.scss';

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [createPost] = useCreatePostMutation();
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
          onSubmit={async (values, { setErrors }) => {
            const response = await createPost({
              variables: {
                input: values,
              },
              update: (cache) => {
                cache.evict({ fieldName: 'posts:{}' });
              },
            });

            if (response.data?.createPost) {
              navigate('/dashboard');
            }
          }}
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
                    <InputField name="text" placeholder="Body..." fieldErrors={errors} textArea={true} />
                  </div>
                </div>
                <div className="form-row">
                  <button type="submit" className="button" onClick={submitForm}>
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
