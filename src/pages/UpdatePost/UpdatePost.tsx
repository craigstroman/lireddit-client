import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../generated/graphql';
import { InputField } from '../../components/InputField/InputField';
import { IPostFormValues } from '../../shared/Interfaces';
import './UpdatePost.scss';

export const UpdatePost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let idParam = null;

  if (id) {
    idParam = parseFloat(id);
  }

  const [{ data, error, fetching }] = usePostQuery({
    pause: idParam === -1,
    variables: {
      id: idParam ? idParam : 0,
    },
  });

  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return (
      <Layout>
        <div>{error.message}</div>
      </Layout>
    );
  }

  if (data && !data.post) {
    return (
      <Layout>
        <div>Couldn't find the post.</div>
      </Layout>
    );
  }

  if (data && data.post && idParam) {
    const initialValues: IPostFormValues = {
      title: data.post.title,
      text: data.post.text,
    };

    const validationSchema = Yup.object({
      title: Yup.string().required('Title name is required.'),
      text: Yup.string().required('Text is required.'),
    });
    return (
      <Layout>
        <div className="update-post-container">
          <h1>Update Post</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setErrors }) => {
              await updatePost({ id: idParam, ...values });

              navigate(`/post/${idParam}`);
            }}
            validationSchema={validationSchema}
          >
            {({ errors }) => {
              if (data) {
                if (data.post) {
                  return (
                    <form>
                      <div className="form-row">
                        <InputField
                          name="title"
                          placeholder="Enter a title:"
                          fieldErrors={errors}
                          value={data.post.title}
                          showLabels={true}
                        />
                      </div>
                      <div className="form-row">
                        <InputField
                          name="text"
                          placeholder="Enter a body:"
                          fieldErrors={errors}
                          textArea={true}
                          value={data.post.text}
                          showLabels={true}
                        />
                      </div>
                      <div className="form-row">
                        <button type="submit" className="button">
                          Update Post
                        </button>
                      </div>
                    </form>
                  );
                }
              }
            }}
          </Formik>
        </div>
      </Layout>
    );
  }
};
