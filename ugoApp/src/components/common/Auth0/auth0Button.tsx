import { useAuth0 } from "@auth0/auth0-react";
import React from "react";  
import { Button } from "semantic-ui-react";

const Auth0LoginButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button color="orange" onClick={() => loginWithRedirect({
            authorizationParams: {
                redirect_uri: window.location.origin,
                scope: 'oponid profile email'
            }
        })}>
            Log In
        </Button>
    )
}

const Auth0LogoutButton: React.FC = () => {
    const { logout } = useAuth0();

    return (
        <Button color="red" onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>
            Log out
        </Button>
    )
}

const Auth0AuthenticationButtons: React.FC = () => {
    const { isAuthenticated} = useAuth0();

    return(
        <div>
            {isAuthenticated ? <Auth0LogoutButton /> : <Auth0LoginButton /> }
        </div>
    )
}

export default Auth0AuthenticationButtons;