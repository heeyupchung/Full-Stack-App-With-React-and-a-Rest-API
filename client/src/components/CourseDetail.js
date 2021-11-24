// A function that fully displays one course and delete a courses.

import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Context } from '../context';

const CourseDetail = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourseDetails(data[0]);
        setUserDetails(data[0].User);
      })
      .catch((error) =>
        console.log('Error fetching and parsing courseDetails', error)
      );
  }, [id]);

  // const ReactMarkdown = require('react-markdown');
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  const history = useHistory();

  // Deletes course with matching id.
  const submit = (e) => {
    e.preventDefault();
    context.data
      .deleteCourse(id, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          history.push('/');
          console.log('Course successfully deleted');
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  };

  return (
    <div onSubmit={submit}>
      {console.log(courseDetails)}
      {authUser && authUser.id === courseDetails.userId ? (
        <div className='actions--bar '>
          <Link className='button' to={`/courses/${courseDetails.id}/update`}>
            Update Course
          </Link>
          <Link onClick={submit} className='button' to='/'>
            Delete Course
          </Link>
          <Link className='button button-secondary' to='/'>
            Return to List
          </Link>
        </div>
      ) : (
        <div className='actions--bar'>
          <Link className='button button-secondary' to='/'>
            Return to List
          </Link>
        </div>
      )}

      <div className='main--flex wrap'>
        <div>
          <h2>Course Detail</h2>
          <h3 className='course--detail--title'>Course</h3>
          <h3 className='course--name'>{courseDetails.title}</h3>
          <p>
            By {userDetails.firstName} {userDetails.lastName}
          </p>
          <ReactMarkdown children={courseDetails.description} />
        </div>
        <div>
          <h3 className='course--detail--title'>Estimated Time</h3>
          {courseDetails.estimatedTime ? (
            <p>{courseDetails.estimatedTime}</p>
          ) : (
            <p>N/A</p>
          )}
          <h3 className='course--detail--title'>Materials Needed</h3>
          {courseDetails.materialsNeeded ? (
            <ul className='course--detail--list'>
              <ReactMarkdown
                children={courseDetails.materialsNeeded}
              ></ReactMarkdown>
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
