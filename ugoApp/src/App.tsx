import NavBar from './components/common/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import { SemanticToastContainer } from 'react-semantic-toasts';
import "react-semantic-toasts/styles/react-semantic-alert.css";
import { NinosProvider } from './helpers/context/NinosContext';
import Auth0ProviderWithHistory from './components/common/Auth0/auth0ProviderHistory';

function App() {
  
  return (
    <NinosProvider>
      <Auth0ProviderWithHistory>
    <div>
      <NavBar />
        <SemanticToastContainer position="bottom-right"/>
      <Container style={{marginTop: '5em'}}>
        <Outlet />
      </Container>
    </div>
    </Auth0ProviderWithHistory>
    </NinosProvider>
  )
}

export default App
