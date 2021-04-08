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
import StatementsTable from "./components/StatementsComponent/StatementsComponent";
import SearchComponent from "./components/SearchComonent/SearchComponent";
import CurrencyInput from './components/CurrencyInputComponent/CurrencyInput';

// Recoil State
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeTabState, authState, responseUserNameState, responseUserIDState } from './Store/Atoms';

// CSS
import './components/NotFoundComponent/NotFoundComponent.css';
import './components/CurrencyInputComponent/CurrencyInput.css';


function App() {

  // ACTIVE STATE USE
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
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
    } else {
      setResponseUserID("");
      setResponseUserName("")
      setAuth(false);
    }
  }

  const handleActiveTab = (tabs) => {
    let isPublic = tabs[0];
    let isFriends = tabs[1];
    
    if (isPublic && !isFriends) {
      setActiveTab("public");
    } else if (!isPublic && isFriends) {
      setActiveTab("friends");
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

  const handlePayment = () => {
    history.push('/add-payment-method');
  }

  const handleStatements = () => {
    history.push('/statements');
  }

  const handleHome = () => {
    history.push('/home');
  }

  const handleSearch = () => {
    history.push('/search');
  }

  const handleAddFunds = () => {
    history.push('/add-funds');
  }


  useEffect(() => {
    readCookie();
  })

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
                handleHome={handleHome}
                handleSignout={handleSignout}
                handlePayment={handlePayment}
                handleStatements={handleStatements}
                handleSearch={handleSearch}
                handleAddFunds={handleAddFunds}
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
        path="/add-payment-method"
        isLoggedIn={auth}
        component={(props) => (
          <React.Fragment>
            <MenuBar>
              <NavigationDrawer
                {...props}
                handleHome={handleHome}
                handleSignout={handleSignout}
                handlePayment={handlePayment}
                handleStatements={handleStatements}
                handleSearch={handleSearch}
                handleAddFunds={handleAddFunds}
              />
            </MenuBar>
            <Divider />
            <CreditCard />
          </React.Fragment>
        )}
      />

      <ProtectedRoute
        exact
        path="/statements"
        isLoggedIn={auth}
        component={(props) => (
          <React.Fragment>
            <MenuBar>
              <NavigationDrawer
                {...props}
                handleHome={handleHome}
                handleSignout={handleSignout}
                handlePayment={handlePayment}
                handleStatements={handleStatements}
                handleSearch={handleSearch}
                handleAddFunds={handleAddFunds}
              />
            </MenuBar>
            <Divider />
            <StatementsTable />
          </React.Fragment>
        )}
      />

      <ProtectedRoute
        exact
        path="/search"
        isLoggedIn={auth}
        component={(props) => (
          <React.Fragment>
            <MenuBar>
              <NavigationDrawer
                {...props}
                handleHome={handleHome}
                handleSignout={handleSignout}
                handlePayment={handlePayment}
                handleStatements={handleStatements}
                handleSearch={handleSearch}
                handleAddFunds={handleAddFunds}
              />
            </MenuBar>
            <Divider />
            <SearchComponent />
          </React.Fragment>
        )}
      />

      <ProtectedRoute
        exact
        path="/add-funds"
        isLoggedIn={auth}
        component={(props) => (
          <React.Fragment>
            <MenuBar>
              <NavigationDrawer
                {...props}
                handleHome={handleHome}
                handleSignout={handleSignout}
                handlePayment={handlePayment}
                handleStatements={handleStatements}
                handleSearch={handleSearch}
                handleAddFunds={handleAddFunds}
              />
            </MenuBar>
            <Divider />
            <div className="Currency">
              <CurrencyInput placeholder="$0.00" type="text"  />
            </div>
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
