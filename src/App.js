import React, { Component , createRef } from "react";
import { Routes, Route, Link , Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Superadminlogin from "./components/superadminlogin.component";
import Userlogin from "./components/userlogin.component";
import Technicianlogin from "./components/technicianlogin.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Sidebar from "./components/sidebar.component";
import Dashbord from "./pages/dashboard";
import UserDashboard from "./pages/userdashboard";
import {Overview,Order_list,Order,Update_Order,Bill_list,} from "./pages/overview";
import { Billing } from "./pages/billing";
import Adduser from "./pages/adduser.component";
import { Update_User } from "./pages/adduser.component";
import UserSidebar from "./components/usersidebar.component";
import { Roleaccess, Updateroleaccess } from "./pages/roleaccess";
import RoleList from "./pages/rolelist";
import UserList from "./pages/userlist";
import EventBus from "./common/EventBus";
import Header from "./pages/header";
import VendorService from "./services/vendor.service";
import { Update_vendor, Vendor } from "./pages/vendor";
import Payment, { Update_payment, Payment_Gateway } from "./pages/payment";
import VendorInventory, {Update_Vendor_Inventory,} from "./pages/VendorInventory";
import Inventory, { Inventory_list, Update_Inventory } from "./pages/Inventory";
import { Food, Food_list, Update_food } from "./pages/food";
import AddOn, { AddOn_list, Update_addon } from "./pages/add_ons";
import {Payment_list,Reports,Vendor_list,Vendor_Invoice_List,Balance_list,} from "./pages/Reports";
import Taxsetting, {Settings,Payment_setting,Super_setting,Tech_setting,Update_Tax,} from "./pages/settings";
import StoreSignup from "./pages/storeSignup";
import Storelist from "./pages/storelist";
import Technician from "./components/technician.component";
import AdminSidebar from "./components/adminsidebar.component";
import SupportSidebar from "./components/supportsidebar.component";
import Supportlist from "./pages/supportlist";
import BoardTechnician from "./components/board-technician.component";
import {ProductForm,Receipe,Receipe_list,Update_Recipe,} from "./pages/receipe";
import ForgotPassword from "./pages/forgotpassword";
import TechForgotUserPassword from "./pages/techforgotpassword";
import SuperForgotUserPassword from "./pages/superforgotpassword";
import ForgotUserPassword from "./pages/forgotuserpassword";
import Resetpassword from "./pages/resetpassword";
import Resetuserpassword from "./pages/resetuserpassword";
import SuperResetpassword from "./pages/superresetpassword";
import TechResetpassword from "./pages/techresetpassword";
import LoginById from "./components/loginbyid.component";
import Freetrial from "./components/freetrial.component";
import BalanceForm from "./components/balanceform.component";
import Subscription from "./pages/subscription";
import { PendingOrder } from "./pages/pendingorder";
import NotificationForm from "./pages/NotificationForm";
import CategoryButton from "./pages/categoryButton";
import { Kot } from "./pages/kot";
import { Shortcut } from "./pages/shortcut";
import { Customer_list } from "./pages/customerlist";
import {Income_list} from "./pages/incomelist";

class App extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
       showSupportBoard: false,
       showSuperAdminBoard: false,
       showAdminBoard: false,
       showUserBoard: false,
       currentUser: undefined
      };
      this.navigateRef = createRef();
  }
  componentDidMount() {
      const user = AuthService.getCurrentUser();
      if (user && typeof user === 'object' && Array.isArray(user.roles)) {
       this.setState({
          currentUser: user,
          showSupportBoard: user.roles.includes("ROLE_SUPPORT"),
          showSuperAdminBoard: user.roles.includes("ROLE_SUPER_ADMIN"),
          showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          showUserBoard: user.roles.includes("ROLE_USER"),
       });
      }
      EventBus.on("logout", this.handleLogout);
  }
  
  componentWillUnmount() {
      EventBus.remove("logout", this.handleLogout);
  }
  
  
  handleLogout = async () => {
  const { currentUser } = this.state;
  
  if (currentUser) {
  try {
       let logoutEndpoint = "";
  
       if (currentUser.roles.includes("ROLE_ADMIN")) {
       logoutEndpoint = "https://test.ubsbill.com/apptest/api/auth/store/Logout";
       } else if (currentUser.roles.includes("ROLE_SUPER_ADMIN")) {
       logoutEndpoint = "https://test.ubsbill.com/apptest/api/auth/SuperAdmin/Logout";
       } else if (currentUser.roles.includes("ROLE_SUPPORT")) {
       logoutEndpoint = "https://test.ubsbill.com/apptest/api/auth/Tech/Logout";
       } else if (currentUser.roles.includes("ROLE_USER")) {
       logoutEndpoint = "https://test.ubsbill.com/apptest/api/auth/user/Logout";
       }
  
       const response = await fetch(logoutEndpoint, {
       method: "POST",
       headers: {
           "Content-Type": "application/x-www-form-urlencoded",
       },
       body: `sessionToken=${currentUser.accessToken}`,
       });
  
       if (response.ok) {
       AuthService.logout();
       localStorage.clear();
       console.log("okayyyyyyyyyy");
  
       // Update state after successful logout
       this.setState({
           showSupportBoard: false,
           showSuperAdminBoard: false,
           showAdminBoard: false,
           showUserBoard: false,
      
       });
  
       // Redirect to the login page
       this.navigateRef.current('/login');
       } else if (response.status === 401) {
       AuthService.logout();
       localStorage.clear();
       console.log("not okayyyyyyyyyy");
  
       // Update state after unsuccessful logout
       this.setState({
           showSupportBoard: false,
           showSuperAdminBoard: false,
           showAdminBoard: false,
           showUserBoard: false,
          
       });
  
       // Redirect to the login page
       this.navigateRef.current('/login');
       } else {
       AuthService.logout();
       localStorage.clear();
       console.log("not y okayyyyyyyyyy");
  
       // Update state after unsuccessful logout
       this.setState({
           showSupportBoard: false,
           showSuperAdminBoard: false,
           showAdminBoard: false,
           showUserBoard: false,
          
       });
  
       // Redirect to the login page
       this.navigateRef.current('/login');
       }
  } catch (error) {
       console.error("Error:", error);
  }
  }
  };
  // logOut() {
  // AuthService.logout();
  // this.setState({
  //     showSupportBoard: false,
  //     showSuperAdminBoard: false,
  //     showAdminBoard: false,
  //     showUserBoard: false,
  //     currentUser: ,
  // });
  // }
  
  

  /*-------------SUNDER------ sidebar height: and width: ------*/
  render() {
   const isLoggedIn = AuthService.isLoggedIn();
    const {
      currentUser,
      showSupportBoard,
      showAdminBoard,
      showUserBoard,
      showSuperAdminBoard,
    } = this.state;
    const navbar = { background: "#03989e", height: "10vh" };

    //---------------for store logout ----------------

    return (
      <div>
         <nav className="navbar navbar-expand navbar-dark fixed-top" style={navbar}>
          <a class="navbar-brand p-0 logo12" href="#">
             <img src={process.env.PUBLIC_URL + "/SYS1.jpg"} className=""style={{width: "9vw",height: "6.5vh",marginLeft: "10vh",borderRadius: "40px",}}alt=""/></a>
 
          {currentUser && <></>}
 
          <div className="navbar-nav mr-auto">
             <li className="nav-item">
              <Link to={"/home"} className="nav-link active"></Link>
             </li>
 
             {showSupportBoard && (
              <>
                 <SupportSidebar />
                 <li className="nav-item">
                  <Link to={"/tech"} className="nav-link active"></Link>
                 </li>
                 <li className="nav-item ml-5 mt-2">
                  <div className="p-2" style={{ marginTop: "-0.6vh" }}>
                     <h6
                      className="mt-2 text-white text-center mx-2"
                      style={{ fontSize: "2.2vh" }}
                     >
                      <i class="fa-solid fa-id-card-clip fa-lg mr-1"></i>{" "}
                      Technician Support Id : {currentUser.techid}
                     </h6>
                  </div>
                 </li>
              </>
             )}
 
             {showSuperAdminBoard && (
              <>
                 <Sidebar />
                 <li className="nav-item"></li>
                 <li className="nav-item ml-5 mt-2">
                  <div className="p-2" style={{ marginTop: "-0.6vh" }}>
                     <h6
                      className="mt-2 text-white text-center mx-2"
                      style={{ fontSize: "2.2vh" }}
                     >
                      <i
                         class="fa-solid fa-id-card-clip fa-lg mr-1"
                         style={{ fontSize: "2.4vh" }}
                      ></i>{" "}
                      Super Admin Id : {currentUser.superid}
                     </h6>
                  </div>
                 </li>
              </>
             )}
             {showAdminBoard && (
              <>
                 <AdminSidebar />
                 <li className="nav-item"></li>
                 <li className="nav-item ml-5 mt-2">
                  <div className="p-2" style={{ marginTop: "-0.6vh" }}>
                     <h6
                      className="mt-2 text-white text-center mx-2"
                      style={{ fontSize: "2.2vh" }}
                     >
                      <i
                         class="fa-solid fa-id-card-clip fa-lg mr-1"
                         style={{ fontSize: "2.4vh" }}
                      ></i>{" "}
                      Store Registration No : {currentUser.regiNum}
                     </h6>
                  </div>
                 </li>
              </>
             )}
             {showUserBoard && (
              <>
                 <UserSidebar />
                 <li className="nav-item">
                  <Link to={"/user"} className="nav-link active"></Link>
                 </li>
                 <li className="nav-item ml-5 mt-1">
                  <div className="p-2" style={{ marginTop: "-0.4vh" }}>
                     <h6
                      className="mt-2 text-white text-center mx-2"
                      style={{ fontSize: "2.2vh" }}
                     >
                      <i
                         class="fa-solid fa-id-card-clip fa-lg mr-1"
                         style={{ fontSize: "2.4vh" }}
                      ></i>{" "}
                      User Id : {currentUser.id}
                     </h6>
                  </div>
                 </li>
              </>
             )}
             {currentUser && <></>}
          </div>
          {currentUser ? (
             <div className="navbar-nav ml-auto">
              <Header />
              <li className="nav-item mr-5" style={{ marginRight: "-40vh" }}>
                 <ul
                  className="navbar-nav me-1 mb-2 mb-lg-0"
                  style={{ fontSize: "2.4vh", marginTop: "0.5vh" }}
                 >
                  <li className="nav-item dropdown p-1">
                     <a
                      className="nav-link active dropdown-toggle fw-bold ml-4"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                     >
                      <i
                         className="fa-solid fa-circle-user fa-lg mr-1"
                         style={{ marginLeft: "-10vh" }}
                      ></i>{" "}
                      {currentUser.username}
                     </a>
                     <ul
                      className="dropdown-menu text-white"
                      aria-labelledby="navbarDropdown"
                     >
                      {showAdminBoard && (
                         <>
                          <li>
                             <a className="dropdown-item " href="/settings">
                              <i class="fa-solid fa-gear"></i> Edit Profile
                             </a>
                          </li>
                          <li>
                             <a
                              className="dropdown-item "
                              onClick={this.handleLogout}
                              href="/login"
                             >
                              <i class="fa-solid fa-right-from-bracket"></i>
                              Logout here
                             </a>
                          </li>{" "}
                         </>
                      )}
                      {showSuperAdminBoard && (
                         <>
                          <li>
                             <a
                              className="dropdown-item "
                              href="/settings/super_setting"
                             >
                              <i class="fa-solid fa-gear"></i> Edit Profile
                             </a>
                          </li>
                          <li>
                             <a
                              className="dropdown-item "
                              onClick={this.handleLogout}
                              href="/login"
                             >
                              <i class="fa-solid fa-right-from-bracket"></i>
                              Logout here
                             </a>
                          </li>
                         </>
                      )}
                      {showSupportBoard && (
                         <>
                          <li>
                             <a
                              className="dropdown-item "
                              href="/settings/tech_setting"
                             >
                              <i class="fa-solid fa-gear"></i> Edit Profile
                             </a>
                          </li>
                          <li>
                             <a
                              className="dropdown-item "
                              onClick={this.handleLogout}
                              href="/login"
                             >
                              <i class="fa-solid fa-right-from-bracket"></i>
                              Logout here
                             </a>
                          </li>
                         </>
                      )}
                      {showUserBoard && (
                         <>
                          <li>
                             <a
                              className="dropdown-item "
                              onClick={this.handleLogout}
                              href="/login"
                             >
                              <i class="fa-solid fa-right-from-bracket"></i>
                              Logout here
                             </a>
                          </li>
                         </>
                      )}
                      <li>
                         <hr className="dropdown-divider " />
                      </li>
                     </ul>
                  </li>
                 </ul>
              </li>
              <div
                 id="google_translate_element"
                 className="btn"
                 style={{
                  transform: "scale(0.8)",
                  width: "15vw",
                  height: "34px",
                  overflow: "hidden",
                  marginTop: "1vh",
                  marginRight: "-7vh",
                 }}
              ></div>
             </div>
          ) : (
             <div className="navbar-nav ml" style={{ marginRight: "95px" }}>
             
                     {/* <button
                      className="btn btn-lg dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      style={{
                         fontSize: "3vh",
                         marginLeft: "9vh",
                         backgroundColor: "#d9d9d9",
                      }}
                      aria-expanded="false"
                     >
                      <Link className="dropdown-item" to="/login">
                      <i
                         className="fa-solid fa-user"
                         style={{ fontSize: "3vh" }}
                      ></i></Link>
                      Login
                     </button> */}
                                     
                     <Link to="/login">
                     <button className="custom12" style={{fontWeight:"500",textcolor:"#03989e"}}>
                     
                     <i className="fa-lg fa-solid fa-users"></i> Login
                     
                     </button>
                     </Link>
                     
                     
                     
                     
                 
             
              <div className="fixed-bottom p-4 text-center" style={navbar}>
                 <div className="text-white footertext" style={{ fontSize: "2.5vh" }}>
                  @Copyright 2023 Design & Developed By SYNTIARO
                 </div>
              </div>
             </div>
          )}
         </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/userdashbord" element={<UserDashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/overview/order_list" element={<Order_list />} />
          <Route path="/billing/:id" element={<Billing />} />
          <Route path="/overview/order" element={<Order />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />}
/>
          <Route path="/login/:id" element={<LoginById />} />
          <Route path="/balanceform" element={<BalanceForm />} />
          <Route path="/superadminlogin" element={<Superadminlogin />} />
          <Route path="/userlogin" element={<Userlogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/freetrial" element={<Freetrial />} />
          <Route path="/technicianlogin" element={<Technicianlogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/tech" element={<BoardTechnician />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/user/adduser" element={<Adduser />} />
          <Route path="/user/update_user/:id" element={<Update_User />} />
          <Route path="/user/userlist" element={<UserList />} />
          <Route path="/role/roleaccess" element={<Roleaccess />} />
          <Route path="/role/rolelist" element={<RoleList />} />
          <Route path="/food/food" element={<Food />} />
          <Route path="/Food/Food_list" element={<Food_list />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vendor/update_vendor/:id" element={<Update_vendor />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/update_payment/:id"element={<Update_payment />}/>
          <Route path="/payment/payment_gateway/:id" element={<Payment_Gateway />}/>
          <Route path="/vendorinventory" element={<VendorInventory />} />
          <Route path="/vendorinventory/update_vendorinventory/:id" element={<Update_Vendor_Inventory />}/>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/inventory_list"element={<Inventory_list />}/>
          <Route path="/inventory/update_inventory/:id"element={<Update_Inventory />}/>
          <Route path="/food/update_food/:id" element={<Update_food />} />
          <Route path="/addon/update_addon/:id" element={<Update_addon />} />
          <Route path="/food/add_ons" element={<AddOn />} />
          <Route path="/AddOn/Addon_list" element={<AddOn_list />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/vendor_list" element={<Vendor_list />} />
          <Route path="/balanceform/balance_list" element={<Balance_list />} />
          <Route path="/reports/payment_list" element={<Payment_list />} />
          <Route path="/overview/bill_list" element={<Bill_list />} />
          <Route path="/reports/vendor_invoice_list"element={<Vendor_Invoice_List />}/>
          <Route path="/overview/update_order/:id" element={<Update_Order />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/super_setting" element={<Super_setting />} />
          <Route path="/settings/tech_setting" element={<Tech_setting />} />
          <Route path="/settings/payment_setting"element={<Payment_setting />}/>
          <Route path="/settings/taxsetting" element={<Taxsetting />} />
          <Route path="/technician" element={<Technician />} />
          <Route path="/storeSignup" element={<StoreSignup />} />
          <Route path="/storelist" element={<Storelist />} />
          <Route path="/supportlist" element={<Supportlist />} />
          <Route path="/settings/update_tax/:id" element={<Update_Tax />} />
          <Route path="/receipe" element={<ProductForm />} />
          <Route path="/receipe_list" element={<Receipe_list />} />
          <Route path="/receipe/update_recipe/:id"element={<Update_Recipe />}/>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/techforgotpassword"element={<TechForgotUserPassword />}/>
          <Route path="/superforgotpassword"element={<SuperForgotUserPassword />}/>
          <Route path="/userforgotpassword" element={<ForgotUserPassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/resetuserpassword" element={<Resetuserpassword />} />
          <Route path="/forgotuserpassword" element={<ForgotUserPassword />} />
          <Route path="/superresetpassword" element={<SuperResetpassword />} />
          <Route path="/techresetpassword" element={<TechResetpassword />} />
          <Route path="/roleaccess/updateroleaccess"element={<Updateroleaccess />}/>
          <Route path="/subscription" element={<Subscription />}></Route>
          <Route path="/reports/balance_list" element={<Balance_list />} />
          <Route path="/pendingorder" element={<PendingOrder />} />
          <Route path="/notification" element={<NotificationForm />} />
          <Route path="/category" element={<CategoryButton />} />
          <Route path="/kot" element={<Kot />} />
          <Route path="/shortcut" element={<Shortcut />} />
          <Route path="/customer_list" element={<Customer_list />}/>
          <Route path="/income_list" element={<Income_list />}/>

        </Routes>
      </div>
    );
  }
}
export default App;
