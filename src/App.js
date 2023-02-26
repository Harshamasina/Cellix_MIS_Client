import './App.css';
import Footer from './Components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Navbar/Header';
import GoToTopBtn from './Components/Body/GoToTopBtn';
import { auth } from './config/firebase';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUsername(user.displayName);
      } else {
        setUsername("");
      }
    });
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <Header name={username}></Header>
        <Footer></Footer>
        <GoToTopBtn></GoToTopBtn>
      </BrowserRouter>
    </div>
  );
}
export default App;
