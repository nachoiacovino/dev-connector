import './App.css';

import { Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ProfileForm from './pages/ProfileForm';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
      </Switch>
    </>
  );
};

export default App;
