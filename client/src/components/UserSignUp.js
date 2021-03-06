// A function that allows users to sign up.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className=''>
        <div className='form--centered'>
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Sign Up'
            elements={() => (
              <React.Fragment>
                <label>First Name</label>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  value={firstName}
                  onChange={this.change}
                />
                <label>Last Name</label>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  value={lastName}
                  onChange={this.change}
                />
                <label>Email Address</label>
                <input
                  id='emailAddress'
                  name='emailAddress'
                  type='text'
                  value={emailAddress}
                  onChange={this.change}
                />
                <label>Password</label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.change}
                />
                <label>Confirm Password</label>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={this.change}
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? Click here to{' '}
            <Link to='/signin'>sign in!</Link>
          </p>
        </div>
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
    const { firstName, lastName, emailAddress, password } = this.state;

    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push('/');
          });
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
