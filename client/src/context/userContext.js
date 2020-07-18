import React, { useState } from "react";

const DEFAULT_USERSTATE = {
  authenticated: false,
};

export const UserContext = React.createContext({});

export default (props) => {
  const [userState, setUserState] = useState(DEFAULT_USERSTATE);

  return (
    <UserContext.Provider value={{ userState, setUserState }} {...props} />
  );
};
