// A function that retrieves and displays all courses on the home page.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div>
        <div className=' form--centered'>
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Sign In'
            elements={() => (
              <React.Fragment>
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
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? Click here to
            <Link to='/signup'> sign up!</Link>
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
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    };
    const { emailAddress, password } = this.state;

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful'] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}

export default UserSignIn;
