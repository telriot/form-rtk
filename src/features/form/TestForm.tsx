import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Alert, Button } from 'reactstrap';
import TextInput from '../../components/TextInput';
import {
  selectError,
  selectMessage,
  selectUser,
  updateUser
} from './formSlice';
import { formSchema } from '../../validators/index';
interface IValues {
  firstName: string;
  lastName: string;
  email: string;
}

function TestForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);

  return (
    <Formik
      initialValues={{
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
      }}
      validationSchema={formSchema}
      onSubmit={async (values: IValues) => {
        try {
          await dispatch(updateUser(values));
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {error && (
            <Alert fade={false} color="danger">
              {error}
            </Alert>
          )}
          {message && (
            <Alert fade={false} color="success">
              {message}
            </Alert>
          )}
          <Field
            name="firstName"
            value="firstName"
            label="First Name"
            placeholder="John"
            component={TextInput}
            type="text"
            error={
              errors.firstName && touched.firstName ? errors.firstName : ''
            }
          />
          <Field
            name="lastName"
            value="lastName"
            label="Last Name"
            placeholder="Doe"
            component={TextInput}
            type="text"
            error={errors.lastName && touched.lastName ? errors.lastName : ''}
          />
          <Field
            name="email"
            value="email"
            label="Email Address"
            placeholder="johndoe@gmail.com"
            component={TextInput}
            type="email"
            error={errors.email && touched.email ? errors.email : ''}
          />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default TestForm;
