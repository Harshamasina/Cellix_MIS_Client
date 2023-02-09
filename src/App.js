import './App.css';
import Footer from './Components/Footer/Footer';
import Header1 from './Components/Navbar/Header1';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header1></Header1>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}
export default App;
