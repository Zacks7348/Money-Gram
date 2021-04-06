// Module Imports
import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

// Component Imports
import CreditCard from './components/CreditCardComponent/CreditCardComponent';
import NavigationDrawer from "./components/NavigationDrawerComponent/NavigationDrawer";
import Login from "./components/LoginComponent/LoginComponent";
import Tab from "./components/TabUiComponent/TabComponent";
import Signup from "./components/SignupComponent/SignupComponent";
import MenuBar from "./components/MenuBarComponent/MenuBarComponent";
import Divider from '@material-ui/core/Divider';
import NotFound from './components/NotFoundComponent/NotFoundComponent'
import ProtectedLogin from "./components/Protected/ProtectedLoginComponent";
import ProtectedRoute from "./components/Protected/ProtectedRouteComponent";

// Recoil State
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeTabState, authState, responseUserNameState, responseUserIDState, cardState } from './Store/Atoms';

// CSS
import './components/NotFoundComponent/NotFoundComponent.css'


function App() {

  // ACTIVE STATE USE
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [card, setCardState] = useRecoilState(cardState);
  const [auth, setAuth] = useRecoilState(authState);
  const setResponseUserName = useSetRecoilState(responseUserNameState);
  const setResponseUserID = useSetRecoilState(responseUserIDState);

  let history = useHistory();


  const readCookie = () => {
    const isAuth = Cookies.get('auth');
    const user_id = Cookies.get('user_id');
    const username = Cookies.get('user_name');

    if (isAuth) {
      setResponseUserID(user_id);
      setResponseUserName(username)
      setAuth(isAuth);
    }
  }

  const handleActiveTab = (tabs) => {
    let isPublic = tabs[0];
    let isFriends = tabs[1];
    let isProfile = tabs[2];

    if (isPublic && !isFriends && !isProfile) {
      setActiveTab("public");
    } else if (!isPublic && isFriends && !isProfile) {
      setActiveTab("friends");
    } else if (!isPublic && !isFriends && isProfile) {
      setActiveTab("profile");
    }
  };

  const handleSignout = () => {
    Cookies.remove('auth');
    Cookies.remove('user_id');
    Cookies.remove('user_name');

    setResponseUserID('');
    setResponseUserName('')
    setAuth(false);
  }

  const handleSettings = () => {
    history.push('/settings');
  }


  useEffect(() => {
    readCookie();
  }, [])

  return (
    <Switch>

      <ProtectedLogin
        exact
        path="/"
        isLoggedIn={auth}
        component={(props) => (
          <React.Fragment>
            <MenuBar>
            </MenuBar>
            <Login
              {...props}
            />
          </React.Fragment>
        )}
      />

      <Route
        exact
        path="/signup"
        component={(props) => (
          <React.Fragment>
            <MenuBar />
            <Signup />
          </React.Fragment>
        )}
      />

      <ProtectedRoute
        exact
        path="/home"
        isLoggedIn={auth}
        component={(props) => (
          <React.Fragment>
            <MenuBar>
              <NavigationDrawer
                {...props}
                handleSignout={handleSignout}
                handleSettings={handleSettings}
              />
            </MenuBar>
            <Divider />
            <Tab
              {...props}
              active_tab={handleActiveTab}
              selected={activeTab}
            />
          </React.Fragment>
        )}
      />

      <ProtectedRoute
        exact
        path="/settings"
        isLoggedIn={auth}
        component={(props) => (
          <React.Fragment>
            <MenuBar>
              <NavigationDrawer
                {...props}
                handleSignout={handleSignout}
                handleSettings={handleSettings}
              />
            </MenuBar>
            <Divider />
              <CreditCard/>
          </React.Fragment>
        )}
      />

      <Route
        path="*"
        component={() => (
          <NotFound />
        )}
      />

    </Switch>
  );
}

export default App;
