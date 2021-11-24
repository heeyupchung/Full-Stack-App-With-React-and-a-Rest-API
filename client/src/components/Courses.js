// A function that retrieves and displays all courses on the home page.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.log('Error fetching and parsing data', error));
  }, []);

  return (
    <div className='main--grid wrap'>
      {courses.map((course) => (
        <div key={course.id}>
          <Link
            className='course--link course--module'
            to={`/courses/${course.id}`}
          >
            <h2 className='course--label'>Course</h2>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
        </div>
      ))}
      <div>
        <Link
          className='course--add--module course--module'
          to={'/courses/create'}
        >
          <span className='course--add--title '>+ New course</span>
        </Link>
      </div>
    </div>
  );
};

export default Courses;
