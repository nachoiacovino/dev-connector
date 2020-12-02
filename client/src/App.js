import './App.css';

import { Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </>
  );
};

export default App;
