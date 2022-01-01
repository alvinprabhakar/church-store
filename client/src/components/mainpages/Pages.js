import React, { useContext } from 'react';
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import {Routes, Route} from 'react-router-dom';
import DetailProduct from './detailProduct/DetailProduct';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import NotFound from './utils/notfound/NotFound';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import {GlobalState} from '../../GlobalState';

function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <div>
      <Routes>
        <Route exact path="/" element={<Products/>} />
        <Route exact path="/detail/:id" element={<DetailProduct />} />
        
        <Route exact path="/login" element={isLogged ? <NotFound/> : <Login/>} />
        <Route exact path="/register" element={isLogged ? <NotFound/> : <Register/>} />
        
        <Route exact path="/category" element={isAdmin ? <Categories /> : <NotFound/> } />
        <Route exact path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound/> } />
        <Route exact path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound/> } />
        
        <Route exact path="/history" element={isLogged ? <OrderHistory/> :  <NotFound />} />
        <Route exact path="/history/:id" element={isLogged ? <OrderDetails/> :  <NotFound />} />
        
        <Route exact path="/cart" element={<Cart/>} />
      </Routes>
        </div>
    )
}

export default Pages;