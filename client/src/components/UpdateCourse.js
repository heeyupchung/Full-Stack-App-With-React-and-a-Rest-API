// A function that updates courses.

import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from './Form';
import { Context } from '../context';

const UpdateCourse = () => {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState([]);
  const [userUpdate, setUserUpdate] = useState([]);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data[0].title);
        setEstimatedTime(data[0].estimatedTime);
        setDescription(data[0].description);
        setMaterialsNeeded(data[0].materialsNeeded);
        setUserUpdate(data[0].User);
      })
      .catch((error) =>
        console.log('Error fetching and parsing courseUpdate', error)
      );
  }, [id]);

  const change = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === 'title') setTitle(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'estimatedTime') setEstimatedTime(value);
    else if (name === 'materialsNeeded') setMaterialsNeeded(value);
  };

  const submit = () => {
    // Updated course
    const updatedCourse = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
    };

    context.data
      .updateCourse(updatedCourse, id, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          history.push('/');
          console.log('Course successfully updated');
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  };

  const cancel = () => {
    history.push(`/courses/${id}`);
  };
  return (
    <div className='wrap'>
      <h1>Update Course</h1>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText='Update course'
        elements={() => (
          <React.Fragment>
            <div className='main--grid'>
              <div>
                <label>Course Title</label>
                <input
                  id='title'
                  type='text'
                  value={title}
                  onChange={change}
                  name='title'
                />
                <p>
                  By {userUpdate.firstName} {userUpdate.lastName}
                </p>
                <label>Course Description</label>
                <textarea
                  id='description'
                  type='text'
                  value={description}
                  onChange={change}
                  name='description'
                ></textarea>
              </div>
              <div>
                <label>Estimated Time</label>
                <input
                  id='estimatedTime'
                  type='text'
                  value={estimatedTime}
                  onChange={change}
                  name='estimatedTime'
                />
                <label>Materials Needed</label>
                <textarea
                  id='materialsNeeded'
                  type='text'
                  value={materialsNeeded}
                  onChange={change}
                  name='materialsNeeded'
                ></textarea>
              </div>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default UpdateCourse;
