import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .required('Required')
    .email('Please enter a valid email address')
  // phone: Yup.string(),
  // city: Yup.string().required("Required"),
  // prefecture: Yup.string().required("Required"),
  // addressLine1: Yup.string().required("Required"),
  // addressLine2: Yup.string(),
  // zipCode: Yup.string().required("Required"),
});
