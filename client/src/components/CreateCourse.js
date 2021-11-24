// A function that creates courses.

import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    materialsNeeded: '',
    estimatedTime: '',
    errors: [],
  };

  render() {
    const { title, description, materialsNeeded, estimatedTime, errors } =
      this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div className='wrap'>
        <h1>Create Course</h1>

        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Create course'
          elements={() => (
            <React.Fragment>
              <div className='main--flex '>
                <div>
                  <label>Course Title</label>
                  <input
                    type='text'
                    value={title}
                    id='1'
                    name='title'
                    onChange={this.change}
                  />

                  <p>
                    By {authUser.firstName} {authUser.lastName}
                  </p>

                  <label>Course Description</label>
                  <textarea
                    type='text'
                    value={description}
                    id='2'
                    name='description'
                    onChange={this.change}
                  ></textarea>
                </div>
                <div>
                  <label>Estimated Time</label>
                  <input
                    type='text'
                    value={estimatedTime}
                    id='3'
                    name='estimatedTime'
                    onChange={this.change}
                  />

                  <label>Materials Needed</label>
                  <textarea
                    type='text'
                    value={materialsNeeded}
                    id='4'
                    name='materialsNeeded'
                    onChange={this.change}
                  ></textarea>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { title, description, materialsNeeded, estimatedTime } = this.state;
    const authUser = context.authenticatedUser;
    console.log(authUser);

    // Created course
    const course = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
      userId: authUser.id,
    };

    context.data
      .createCourse(course, authUser.emailAddress, authUser.password)
      .then(console.log(course))
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
          console.log('Course successfully created');
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}

export default CreateCourse;
