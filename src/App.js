import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import User from './components/User';
import UsersList from './components/UsersList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
