import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router-dom';
import { ContextProvider } from './Components/ContextProvider';
import HomePage from './Components/HomePage/HomePage';
import Game from './Components/Game/Game';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/game" element={<Game></Game>}></Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
