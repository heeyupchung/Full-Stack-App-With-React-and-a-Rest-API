// The App component is the main component after index.js it renders all other components as well as routing to url paths.

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserSignUp from './components/UserSignUp.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignOut from './components/UserSignOut.js';
import Header from './components/Header';
import Courses from './components/Courses';
import PrivateRoute from './PrivateRoute';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';

import './styles/global.css';

import withContext from './context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseCreateWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={Courses} />
          <PrivateRoute
            exact
            path='/courses/create'
            component={CourseCreateWithContext}
          />
          <PrivateRoute
            exact
            path='/courses/:id/update'
            component={UpdateCourseWithContext}
          />
          <Route
            exact
            path='/courses/:id'
            component={CourseDetailWithContext}
          />
          <Route exact path='/signin' component={UserSignInWithContext} />
          <Route exact path='/signup' component={UserSignUpWithContext} />
          <Route exact path='/signout' component={UserSignOutWithContext} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
