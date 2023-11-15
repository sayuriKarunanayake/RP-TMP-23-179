import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "../CSS/it20198954.css";

import logo from '../Assets/IT20198954/logo (2).png';
import axios from "axios";

const NavBar = () => {
  const [value, setValue] = useState("");
  const [UserData, setUserData] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const navigation = useNavigate();

  // useEffect(() => {
  //   // Moved the API call inside useEffect
  //   const getUser = async () => {
  //     try {
  //       const result = await axios.get(`https://itconnect-backend-8c64d94c6e02.herokuapp.com/register/find/${email}`);
  //       setUserData(result.data.data);
  //       console.log(UserData, "UserData nav bar");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [email, UserData]);

  const handleJob = () => {
    navigation("/home", { state: { email } });
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: "#1976d2", width: "auto", ml: "auto" }}>
        <Navbar className="navbar1" collapseOnSelect expand="lg" bg="bg-*purple" variant="light">
          <Toolbar>
            <a href="/signin">
              <img
                style={{ height: 40, width: 180, marginLeft: 2 }}
                className="rounded-circle"
                src={logo}
                href="/adduser"
                alt="User Avatar"
              ></img>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/readf" style={{ textDecoration: 'none', color: 'white' }} className="nav-link">
              View Jobs
            </a>
            &nbsp;&nbsp;   &nbsp;&nbsp;
            <a onClick={handleJob}  style={{ transition: "background-color 0.3s" }} className="nav-link">
              Job Recommendations
            </a>   &nbsp;&nbsp;   &nbsp;&nbsp;
            <a href="/home"   style={{ textDecoration: 'none', color: 'white' }} className="nav-link">
              Enhance CV
            </a>   &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/readf" style={{ textDecoration: 'none', color: 'white' }} className="nav-link">
              Feedbacks
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tabs sx={{ ml: "auto" }} value={value} onChange={(e, val) => setValue(val)}>
              <a href="/signin">
                <img
                  style={{ height: 50, width: 50, marginLeft: 552 }}
                  className="rounded-circle"
                  src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                  href="/adduser"
                  alt="User Avatar"
                ></img>
              </a>
            </Tabs>
          </Toolbar>
        </Navbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Tabs,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from "react-bootstrap";

// import logo from '../Assets/logo (2).png';
// import axios from "axios";

// const NavBar = () => {
//   const [value, setValue] = useState("");
//   const [UserData, setUserData] = useState([]);
//   const [email, setEmail] = useState(localStorage.getItem("email"));
//   const navigation = useNavigate();

//   useEffect(() => {
//     // Moved the API call inside useEffect
//     const getUser = async () => {
//       try {
//         const result = await axios.get(`https://itconnect-backend-8c64d94c6e02.herokuapp.com/register/find/${email}`);
//         setUserData(result.data.data);
//         console.log(UserData, "UserData nav bar");
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUser();
//   }, [email, UserData]);

//   const handleJob = () => {
//     navigation("/home", { state: { email } });
//   };

//   return (
//     <div>
//       <AppBar position="sticky" sx={{ backgroundColor: "#1976d2 ", width: "auto", ml: "auto" }}>
//         <Navbar className="navbar1" collapseOnSelect expand="lg" bg="bg-*purple" variant="light">
//           <Toolbar>
//             <a href="/signin">
//               <img
//                 style={{ height: 40, width: 180, marginLeft: 2 }}
//                 className="rounded-circle"
//                 src={logo}
//                 href="/adduser"
//                 alt="User Avatar"
//               ></img>
//             </a>
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <Button
//               variant="text"
//               href="/readf"
//               className="nav-link"
//               style={{ backgroundColor: "#1976d2" }}
//               activeClassName="active"
//             >
//               <div class="text-secondary" style={{ color: 'white' }}>View Jobs  </div>
             
//             </Button>
//             <Button
//               variant="text"
//               onClick={handleJob}
//               className="nav-link"
//               style={{ backgroundColor: "#1976d2" }}
//               activeClassName="active"
//             >
//               <div class="text-secondary" style={{ color: 'white' }}> Job Recommendations  </div>
              
//             </Button>
//             <Button
//               variant="text"
//               href="/home"
//               className="nav-link"
//               style={{ backgroundColor: "#1976d2" }}
//               activeClassName="active"
//             >
//               <div class="text-secondary" style={{ color: 'white' }}>Enhance CV</div>
//             </Button>
//             <Button
//               variant="text"
//               href="/readf"
//               className="nav-link"
//               style={{ backgroundColor: "#1976d2" }}
//               activeClassName="active"
//             >
//                <div class="text-secondary" style={{ color: 'white' }}>Feedbacks</div>
//             </Button>
//             &nbsp;&nbsp;
//             <Tabs sx={{ ml: "auto" }} value={value} onChange={(e, val) => setValue(val)}>
//               <a href="/signin">
//                 <img
//                   style={{ height: 50, width: 50, marginLeft: 552 }}
//                   className="rounded-circle"
//                   src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
//                   href="/adduser"
//                   alt="User Avatar"
//                 ></img>
//               </a>
//             </Tabs>
//           </Toolbar>
//         </Navbar>
//       </AppBar>
//     </div>
//   );
// };

// export default NavBar;
 