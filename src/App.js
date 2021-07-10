import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';
import LoginPage from './components/Authentication/LoginPage';
import RegisterPage from './components/Authentication/RegisterPage';
import DashboardLayout from './components/Layouts/DashboardLayout';
import Home from './components/HomePage/Home';
import Users from './components/Users';
import Profile from './components/Profile/Profile';
import PublicLayout from './components/Layouts/PublicLayout';
import Forum from 'components/Forum/Forum';
import Messages from 'components/Messages/Message';
function App() {
  //Getting isAuthenticated store value from Authentication reducer.
  const { isAuthenticated } = useSelector((state) => state.authenticateReducer);
  return (
    <Router>
      <Switch>
        <PublicRoute path='/login' isAuthenticated={isAuthenticated}>
          <LoginPage />
        </PublicRoute>
        <PublicRoute path='/register' isAuthenticated={isAuthenticated}>
          <RegisterPage />
        </PublicRoute>
        <PublicRoute path='/home' isAuthenticated={isAuthenticated}>
          <Home />
        </PublicRoute>
        <PrivateRoute path='/' isAuthenticated={isAuthenticated}>
          <ProtectedRoutes />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

// Private route restrict to access public pages after login.
function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <DashboardLayout>{children}</DashboardLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

// Public route restrict to access authenticated pages before login.
function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          <PublicLayout>{children}</PublicLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

// Here we include the components which need to be accesses after successful login.
function ProtectedRoutes() {
  return (
    <Switch>
      <Route path='/dashboard'>
        <Users />
      </Route>
      <Route path='/users'>
        <Users />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/forum'>
        <Forum />
      </Route>
      <Route path='/messages'>
        <Messages />
      </Route>
    </Switch>
  );
}

export default App;
