import './App.css';
import Footer from './Components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Navbar/Header';
import GoToTopBtn from './Components/Body/GoToTopBtn';
import { auth } from './config/firebase';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Footer></Footer>
        <GoToTopBtn></GoToTopBtn>
      </BrowserRouter>
    </div>
  );
}
export default App;
