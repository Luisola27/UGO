import { useAuth0 } from "@auth0/auth0-react";
import LoginRequiredPage from "../Login/LoginRequired";

interface ValidateAuthenticationProps {
    children: React.ReactNode;
  }

const ValidateAuthentication: React.FC<ValidateAuthenticationProps> = ({
    children
}) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
       return <LoginRequiredPage></LoginRequiredPage>;
    }

    return <>{children}</>
}

export default ValidateAuthentication;