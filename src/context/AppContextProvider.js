import React, { Component, createContext } from "react";

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    appState: "LOGIN_REQUIRED",
    hasMenu: true,
    user: null
  };


  setUser = (user) => {
    this.setState({ user });
  };

  setHasMenu = (hasMenu) => {
    this.setState({ hasMenu });
  };

  setAppState = (appState) => {
    this.setState({ appState });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setHasMenu: this.setHasMenu,
          setAppState: this.setAppState,
          setUser: this.setUser,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
