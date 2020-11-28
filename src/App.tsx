import React from 'react';
import TestForm from './features/form/TestForm';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectStatus, selectError } from './features/form/formSlice';
import SpinnerDiv from './components/SpinnerDiv';
function App() {
  const dispatch = useDispatch();
  const formStatus = useSelector(selectStatus);
  const formError = useSelector(selectError);
  React.useEffect(() => {
    formStatus === 'idle' && dispatch(getUser());
  }, []);

  return (
    <Container>
      {formStatus === 'fulfilled' ? (
        <TestForm />
      ) : formStatus === 'rejected' ? (
        <div>{formError}</div>
      ) : (
        <SpinnerDiv />
      )}
    </Container>
  );
}

export default App;
