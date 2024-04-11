import NavBar from './components/common/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import { SemanticToastContainer } from 'react-semantic-toasts';
import "react-semantic-toasts/styles/react-semantic-alert.css";
import { NinosProvider } from './helpers/context/NinosContext';

function App() {
  return (
    <NinosProvider>
    <div>
      <NavBar />
      <Container style={{marginTop: '6em'}}>
        <SemanticToastContainer position="bottom-right"/>
        <Outlet />
      </Container>
    </div>
    </NinosProvider>
  )
}

export default App
