import React, { useState } from "react";

// this should have an object that is your user from the server
const DEFAULT_USERSTATE = {
  authenticated: false,
};

export const UserContext = React.createContext({});

export default (props) => {
  const [userState, setUserState] = useState(DEFAULT_USERSTATE);
  console.log(userState);

  return (
    <UserContext.Provider value={{ userState, setUserState }} {...props} />
  );
};
