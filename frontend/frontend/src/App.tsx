import { Routes, Route } from 'react-router-dom';
import Chatpage from './Pages/chatpage';
import Homepage from './Pages/homepage';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
