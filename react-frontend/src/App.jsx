import './style/App.css';
import AuthenticationPage from './pages/AuthenticationPage';
import { app } from './firebase/config';

function App() {
  console.log('Firebase initialized:', app);
  return (
    <div className="App">
      <AuthenticationPage />
    </div>
  );
}

export default App;
