import React, {useContext} from "react";
import { UserContext } from './UserContext'
import {Link, Redirect} from 'react-router-dom'

const Cart = ({ allItems, deleteItem, buyItem }) => {

  const context = useContext(UserContext)

  const deleteProduct = (item) => {
    deleteItem(item);
  };

  const buyNow = () => {
    buyItem();
  }

  let amount = 0;
  allItems.forEach((item) => {
    amount = parseFloat(amount) + parseFloat(item.productPrice);
  });
    
    const valueChange = (e) => {
      const value = e.target.value
     
    }

  return (
    <section className="cart">
      <h1>Your Cart</h1>
      <div className="cart-wrapper">
        <div className="cart-items">
          {allItems.map((item) => (
            <div className="cart-items-inner">
              <img src={item.tinyImage} alt="" />
              <div className="cart-items-info">
                <div className="card-title">{item.productName}</div>
                <div className="price">Rs. {item.productPrice}</div>
                <div className="quantity">
                  <input onChange={valueChange} type="number" step="1" min="1" max="5" defaultValue="1"  />
                </div>
                <div>
                  <button
                    onClick={() => deleteProduct(item)}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          {allItems.length >= 1 ? (
            <>
              <div className="cart-total-wrapper">
                <div className="total-info">
                  <h2>Subtotal : </h2>
                  <p>Products Total : </p>
                  <p>Discount (if any) : </p>
                  <p>Delivery Charge : </p>
                  <h2>Grand Total : </h2>
                </div>
                <div className="total-value">
                  <h2>Rs. {amount}</h2>
                  <p>Rs. {amount}</p>
                  <p>Rs. 50</p>
                  <p>Rs. 70</p>
                  <h2>Rs. {amount - 50 + 70 }</h2>
                </div>
              </div>
              {context.user?.uid ?
                (
                  <>
                    <span onClick={buyNow} className="proceedtoPay deleteBtn">Proceed to Pay</span>
                   
                  </>
                )
                  :
                  (
                    <Link to='/login'><span className="proceedtoPay deleteBtn">Proceed to Pay</span></Link>
                  )}
           
            </>
          ) : (
            <h1>Cart is empty</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
