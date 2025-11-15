import React, { useState, useEffect, ChangeEvent } from 'react';
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
  const [fieldTitle, setFieldTitle] = useState<string>('');
  const [fieldText, setFieldText] = useState<string>('');

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

  useEffect(() => {
    if (!fetching) {
      if (data) {
        if (data.post) {
          setFieldTitle(data.post.title);
          setFieldText(data.post.text);
        }
      }
    }
  }, [data, fetching]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (fieldName === 'title') {
      setFieldTitle(e.target.value);
    } else if (fieldName === 'text') {
      setFieldText(e.target.value);
    }
  };

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
                    <Form>
                      <div className="form-row">
                        <InputField
                          name="title"
                          placeholder="Enter a title:"
                          fieldErrors={errors}
                          value={fieldTitle}
                          showLabels={true}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'title')}
                        />
                      </div>
                      <div className="form-row">
                        <InputField
                          name="text"
                          placeholder="Enter a body:"
                          fieldErrors={errors}
                          textArea={true}
                          value={fieldText}
                          showLabels={true}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'text')}
                        />
                      </div>
                      <div className="form-row">
                        <button type="submit" className="button">
                          Update Post
                        </button>
                      </div>
                    </Form>
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
