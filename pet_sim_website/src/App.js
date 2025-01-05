import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './NavigationBar';
import Home from "./Pages/Home"
import ItemDetail from './ItemDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  // React router handles
    return (
      <>
        <NavigationBar />
        <div className="container">
          <Routes>
          <Route path="/" element={<Home/ >} />
          <Route path="/item/:itemId" element={<ItemDetail />} />
          </Routes>
        </div>
      </>
    )
}

export default App;
