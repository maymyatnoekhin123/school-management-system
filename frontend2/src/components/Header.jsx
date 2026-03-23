import StudentHeader from "./students/StudentHeader";
import TeacherHeader from "./teachers/TeacherHeader";

import {
     Box,
     AppBar,
     Toolbar,
     Typography,
     IconButton,
} from "@mui/material";

import {
     Menu as MenuIcon,
     Settings as SettingIcon,
     AccountCircle as ProfileIcon,
     LightMode as LightModeIcon,
     School as SchoolIcon,
     DarkMode as DarkModeIcon
} from "@mui/icons-material";

import { useApp } from "../ThemeApp.jsx";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./admin/AdminHeader.jsx";

export default function Header() {
     const navigate = useNavigate();
     const { showDrawer, setShowDrawer, auth } = useApp();

     const renderRoleHeader = () => {
          if (!auth) return <StudentHeader />
          if (auth) {
               if (auth.roles.includes("admin")) return <AdminHeader />;
               if (auth.roles.includes("teacher")) return <TeacherHeader />;
               if (auth.roles.includes("student")) return <StudentHeader />;
          }
          return null;
     };

     return (
          <AppBar position="fixed">
               <Toolbar>
                    {/* Mobile မှာ Menu ဖွင့်ဖို့ IconButton ကို Append လုပ်ထားသည် */}
                    <IconButton
                         color="inherit"
                         edge="start"
                         sx={{ display: { xs: "block", md: "none" } }}
                         onClick={() => setShowDrawer(!showDrawer)}>
                         <MenuIcon />
                    </IconButton>

                    <IconButton
                         sx={{ flexGrow: 1, ml: 2 }}
                         color="inherit"
                         size="xl"
                         onClick={() => navigate("/")}>
                         <img src="/logo.png" alt="Logo" style={{ width: '130px', height: '130px' }} />
                    </IconButton>

                    {/* Role Header ကို Desktop မှာမှပြရန် Box sx ကို Append လုပ်ထားသည် */}
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                         {renderRoleHeader()}
                    </Box>

                    <Box>
                         <IconButton color="inherit"
                              onClick={() => setShowDrawer(!showDrawer)}>
                              <ProfileIcon />
                         </IconButton>
                    </Box>
               </Toolbar>
          </AppBar>
     )
}