import './App.css';
import Product from './component/product';
import Dataproducts from './component/dataproducts';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom"
import { useState } from 'react';
import Admin from './component/admin';

function App() {


  const [idProduct, setIdproduct] = useState([]);
  const AddId = (itemID) => {
    setIdproduct(itemID);
  }


  return (
    <Router>
      <div className="App">
        <h1 className='text-center'>VENDING MACHING</h1>
        <Link to='/admin' ><h2 className='text-center'>RESTOCK</h2></Link>
        <Routes>
          <Route path='/' element={<Dataproducts id={AddId} />}></Route>
          <Route path='/products' element={<Product test={idProduct} />}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
