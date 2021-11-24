// A form that displays error and handles form functions through out the app.

import React from 'react';

const Form = (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div className='validation--errors'>
          <h3>Validation errors</h3>
          <ul>
            {errors.map((error, i) => (
              <li className='validation--errors' key={i}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return errorsDisplay;
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div>
          <button className='button' type='submit'>
            {submitButtonText}
          </button>
          <button className='button-secondary button' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
