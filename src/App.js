import './App.css';
import Footer from './Components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Navbar/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}
export default App;
