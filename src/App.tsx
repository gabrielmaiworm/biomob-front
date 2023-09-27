import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { Routes, Route } from "react-router-dom";
import { User } from './pages/User';
import { Event } from './pages/Event';
import { Job } from './pages/Job';
import { Parking } from './pages/Parking';
import { Calcadas } from './pages/Calcadas';
import LoginMaster from './pages/Login';
import RequireAuth from './Utils/RequireAuth';



export function App() {
  return (
    <div className="App">
      <Header />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginMaster />} />
        <Route path="/user" element={<RequireAuth><User /></RequireAuth>} />
        <Route path="/event" element={<RequireAuth><Event /></RequireAuth>} />
        <Route path="/job" element={<RequireAuth><Job /></RequireAuth>} />
        <Route path="/calcadas" element={<RequireAuth><Calcadas /></RequireAuth>} />
        <Route path="/parking" element={<RequireAuth><Parking /></RequireAuth>} />
      </Routes>
    </div>
  );
}

