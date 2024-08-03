import React, { Component, createContext } from "react";
export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    userInformation: {role : "ADMIN"},
    auth: null,
  };

  setUserInformation = (userInformation) => {
    this.setState({ userInformation: userInformation.user});
    this.setState({ auth: userInformation});
      localStorage.setItem("user", JSON.stringify(userInformation.user));
      localStorage.setItem("auth", JSON.stringify(userInformation));
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUserInformation: this.setUserInformation,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
