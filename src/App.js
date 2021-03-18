import React, { useState, useContext } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Router
import { Switch, Route, Link } from "react-router-dom";

//Firebase
import firebase from "firebase/app";
import "firebase/auth";

import config from './configuration/config'

//Components
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PageNotFound from "./Components/PageNotFound";

//Context
import { UserContext } from "./Components/UserContext";

//Init Firebase
firebase.initializeApp(config)

function App() {
  const context = useContext(UserContext);

  const [user, setUser] = useState(null);

  const [cartItem, setCartItem] = useState([]);

  const addtoCart = (item) => {
    const isAlreadyAdded = cartItem.findIndex(function (array) {
      return array.id === item.id;
    });

    if (isAlreadyAdded !== -1) {
      return toast("Item already added", { type: "error" });
    }

    setCartItem([...cartItem, item]);

    toast("Item added to cart", { type: "success" });
  };

  let a = cartItem.length;

  const deleteItem = (item) => {
    setCartItem(cartItem.filter((singleItem) => singleItem.id !== item.id));
    toast("Item Deleted", { type: "error" });
  };

  const buyItem = () => {
    setCartItem([])
    return toast('Purchased successfully', {type:'success'})
  }

  return (
    <div className="wrapper">
      <ToastContainer
        style={{ fontSize: "2rem" }}
        position="top-center"
      ></ToastContainer>

     
      <UserContext.Provider value={{ user, setUser }}>
      <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <Navbar length={a} />
                <Products {...props} addtoCart={addtoCart} />
              </>
            )}
          />

          <Route
            exact
            path="/cart"
            render={(props) => (
              <>
                <Navbar length={a} />
                <Cart
                  {...props}
                  allItems={cartItem}
                  deleteItem={deleteItem}
                  buyItem={buyItem}
                />
              </>
            )}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="*" component={PageNotFound} />
          </Switch>
        </UserContext.Provider>
        
    
    </div>
  );
}

export default App;
