import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaUserPlus, FaHome } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", name: "Home", icon: <FaHome className="mr-2" /> },
    { path: "/users", name: "Users", icon: <FaUsers className="mr-2" /> },
    {
      path: "/add-user",
      name: "Add User",
      icon: <FaUserPlus className="mr-2" />,
    },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-primary-600">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to={"/"} className="text-2xl font-bold">
              MERN CRUD App
            </Link>

            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Stack from "@mui/material/Stack";
// import HomeIcon from "@mui/icons-material/Home";
// import GroupIcon from "@mui/icons-material/Group";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { Link, useLocation } from "react-router-dom";

// export default function ButtonAppBar() {
//   const location = useLocation();

//   const navItems = [
//     {
//       path: "/",
//       name: "Home",
//       icon: <HomeIcon fontSize="small" />,
//     },
//     {
//       path: "/users",
//       name: "Users",
//       icon: <GroupIcon fontSize="small" />,
//     },
//     {
//       path: "/add-user",
//       name: "Add User",
//       icon: <PersonAddIcon fontSize="small" />,
//     },
//   ];

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Container maxWidth="lg">
//           <Toolbar disableGutters>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>

//             <Typography
//               variant="h6"
//               component={Link}
//               to="/"
//               sx={{
//                 flexGrow: 1,
//                 color: "inherit",
//                 textDecoration: "none",
//                 fontWeight: 700,
//               }}
//             >
//               MERN CRUD API
//             </Typography>

//             {/* Nav Links */}
//             <Stack direction="row" spacing={1}}>
//                 {navItems.map((item)=>{
//                     const isActive = location.pathname === item.path;
//                 })}
//             </Stack>

//             <Button color="inherit">Register</Button>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </Box>
//   );
// }
