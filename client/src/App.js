import './App.css';

import { Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import AddEducation from './pages/AddEducation';
import AddExperience from './pages/AddExperience';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Post from './pages/Post';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import ProfileForm from './pages/ProfileForm';
import Profiles from './pages/Profiles';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
      </Switch>
    </>
  );
};

export default App;
