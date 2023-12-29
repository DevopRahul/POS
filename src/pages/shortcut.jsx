import React from "react";
import "./shortcut.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export const Shortcut = () => {
  const navigate = useNavigate();
useEffect(() => {
   const keyMappings = {
    'N': '/overview/order',
    'R': '/pendingorder',
    'B': '/overview/bill_list',
    'I': '/inventory',
    '1': '/inventory/Inventory_list',
    'V': '/vendor',
    'P': '/payment',
    'T': '/VendorInventory',
    'M': '/food/food',
    'F': '/Food/Food_list',
    'A': '/food/add_ons',
    '2': '/addOn/addOn_list',
    'G': '/receipe',
    '3': '/receipe_list',
    '4': '/reports/vendor_list',
    '5': '/reports/payment_list',
    '6': '/reports/vendor_invoice_list',
    'U': '/user/adduser',
    '7': '/user/userlist',
    '8': '/reports/balance_list',
    'X': '/settings/taxsetting',
    'S': '/settings',
    'Y': '/settings/payment_setting',
    'Z': '/category',
    'C': '/balanceform',
    'O': '/overView/order_list',
    'H': '/dashbord',
    'K': '/kot',
   };
 
    const handleKeyPress = (e) => {
  // Check if e.key is defined before calling toUpperCase
  const key = e.key ? e.key.toUpperCase() : null;

  if (e.altKey && keyMappings[key]) {
    navigate(keyMappings[key]);
  }
};
 
   window.addEventListener('keydown', handleKeyPress);
 
   return () => {
    window.removeEventListener('keydown', handleKeyPress);
   };
 }, [navigate]);

  return (
    <div className="animation d-flex justify-content-center" style={{marginTop:"15vh"}} >
      <div className="border border-dark p-4">
        <table className="table">
          <thead>
            <tr>
              <th>Operation</th>
              <th>Shortcut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>New Order</td>
              <td>Alt + N</td>
            </tr>
            <tr>
              <td>Running Order</td>
              <td>Alt + R</td>
            </tr>
            <tr>
              <td>Order List</td>
              <td>Alt + O</td>
            </tr>
            <tr>
              <td>Bill List</td>
              <td>Alt + B</td>
            </tr>
            <tr>
              <td>Add Inventory</td>
              <td>Alt + I</td>
            </tr>
            <tr>
              <td>Inventory List</td>
              <td>Alt + 1</td>
            </tr>
            <tr>
              <td>Add Vendor</td>
              <td>Alt + V</td>
            </tr>
            <tr>
              <td>Add Payment</td>
              <td>Alt + P</td>
            </tr>
            <tr>
              <td>Add Vendor Inventory</td>
              <td>Alt + T</td>
            </tr>
            <tr>
              <td>Add Food</td>
              <td>Alt + M</td>
            </tr>
            <tr>
              <td>Food List</td>
              <td>Alt + F</td>
            </tr>
            <tr>
              <td>Add Addon</td>
              <td>Alt + A</td>
            </tr>
            <tr>
              <td>Addon List</td>
              <td>Alt + 2</td>
            </tr>
          
          </tbody>
        </table>
      </div>

      <div className="border border-dark p-4 ml-3">
        <table className="table">
          <thead>
            <tr>
              <th>Operation</th>
              <th>Shortcut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Add Recipe</td>
              <td>Alt + G</td>
            </tr>
            <tr>
              <td>Recipe List</td>
              <td>Alt + 3</td>
            </tr>
            <tr>
              <td>Vendor List</td>
              <td>Alt + 4</td>
            </tr>
            <tr>
              <td>Payment List</td>
              <td>Alt + 5</td>
            </tr>
            <tr>
              <td>Vendor Inventory List</td>
              <td>Alt + 6</td>
            </tr>
            <tr>
              <td>Add User</td>
              <td>Alt + U</td>
            </tr>
            <tr>
              <td>User List</td>
              <td>Alt + 7</td>
            </tr>
            <tr>
              <td>Tax Setting</td>
              <td>Alt + X</td>
            </tr>
            <tr>
              <td>Store Setting</td>
              <td>Alt + S</td>
            </tr>
            <tr>
              <td>Payment Setting</td>
              <td>Alt + Y</td>
            </tr>
            <tr>
              <td>Dashboard</td>
              <td>Alt + H</td>
            </tr>
            <tr>
              <td>Cash register</td>
              <td>Alt + C</td>
            </tr>
            <tr>
              <td>Cash List</td>
              <td>Alt + 8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
