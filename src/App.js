import './App.css';
import Footer from './Components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Navbar/Header';
import GoToTopBtn from './Components/Body/GoToTopBtn';

function App() {
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
