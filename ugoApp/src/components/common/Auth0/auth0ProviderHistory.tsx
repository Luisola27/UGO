import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Auth0ProviderWithHistoryProps {
  children: React.ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const onRedirectCallBack = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
      <Auth0Provider
        domain="dev-1l5ihhwf64dczi0l.us.auth0.com"
        clientId="UyG7YXEhwfumWgebmuioeWrYZEHN4HvM"
        authorizationParams={{ redirect_uri: window.location.origin }}
        onRedirectCallback={onRedirectCallBack}
      >
        {children}
      </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
