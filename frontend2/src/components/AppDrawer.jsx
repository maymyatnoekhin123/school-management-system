import {
     Box,
     Drawer,
     Divider,
     List,
     ListItem,
     ListItemButton,
     ListItemIcon,
     ListItemText,
     Avatar,
     Typography
} from "@mui/material"

import {
     Home as HomeIcon,
     Person as ProfileIcon,
     Logout as LogoutIcon,
     PersonAdd as PersonAddIcon,
     Login as LoginIcon,
     LightMode,
     DarkMode,
     Settings,
     Dashboard as DashboardIcon,
     People as PeopleIcon,
     School as SchoolIcon,
     HistoryEdu as HistoryEduIcon,
     
} from "@mui/icons-material"

import { deepPurple } from "@mui/material/colors"

import { useApp } from "../ThemeApp"
import { useNavigate } from "react-router-dom"
import { logout } from "../api/loginAPI"

export default function AppDrawer() {

     const navigate = useNavigate();
     const { showDrawer, setShowDrawer, auth, setAuth, mode, setMode } = useApp();

     // --- Append: Role အလိုက် Mobile Menu Items များ သတ်မှတ်ခြင်း ---
     const getRoleMenus = () => {
          if (!auth) return [];
          const roles = auth.roles;

          if (roles.includes("admin")) {
               return [
                    { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
                    { text: "Academic Years", path: "/admin/years", icon: <HistoryEduIcon /> },
                    { text: "User Management", path: "/admin/users", icon: <PeopleIcon /> },
                    { text: "Register Student", path: "/admin/students/register", icon: <PersonAddIcon /> },
                    { text: "Register Teacher", path: "/admin/teachers/register", icon: <SchoolIcon /> },
               ];
          }
          if (roles.includes("teacher")) {
               return [
                    { text: "Dashboard", path: "/teachers/dashboard", icon: <DashboardIcon /> },
                    { text: "Attendance-Log", path: "/teachers/attendance", icon: <HistoryEduIcon /> },
                    { text: "Gradebook", path: "/teachers/grades", icon: <PeopleIcon /> },
               ];
          }
          if (roles.includes("student")) {
               return [
                    { text: "Dashboard", path: "/students/dashboard", icon: <DashboardIcon /> },
                    { text: "My Grades", path: "/students/grades", icon: <HistoryEduIcon /> },
               ];
          }
          return [];
     };

     return (
          <div>
               <Drawer
                    open={showDrawer}
                    onClose={() => setShowDrawer(false)}
                    anchor="right"
               >
                    <Box
                         sx={{
                              mb: 6,
                              width: 300,
                              height: 140,
                              bgcolor: "banner",
                              position: "relative"
                         }}>
                         <Box
                              sx={{
                                   gap: 2,
                                   display: "flex",
                                   flexDirection: "row",
                                   alignItems: "center",
                                   position: "absolute",
                                   left: 20,
                                   top: 70,
                              }}>
                              <Avatar
                                   sx={{
                                        width: 94,
                                        height: 94,
                                        color: "white",
                                        background: deepPurple[500],
                                   }}
                                   src={auth?.photo || ""}
                              />
                              <Typography sx={{ fontWeight: "bold" }}>
                                   {auth && auth.name}
                              </Typography>
                         </Box>
                    </Box>
                    <List>
                         {/* --- Append: Mobile မှာပဲ ပေါ်မည့် Role Specific Menus --- */}
                         <Box sx={{ display: { xs: "block", md: "none" } }}>
                              {getRoleMenus().map((item) => (
                                   <ListItem key={item.text} disablePadding>
                                        <ListItemButton onClick={() => { navigate(item.path); setShowDrawer(false); }}>
                                             <ListItemIcon>{item.icon}</ListItemIcon>
                                             <ListItemText primary={item.text} />
                                        </ListItemButton>
                                   </ListItem>
                              ))}
                              <Divider sx={{ my: 1 }} />
                         </Box>

                         <ListItem>
                              <ListItemButton onClick={() => mode === "dark" ? setMode("light") : setMode("dark")}>
                                   <ListItemIcon>
                                        {mode === "dark" ? <LightMode /> : <DarkMode />}
                                   </ListItemIcon>
                                   <ListItemText>
                                        {mode === "dark" ? "Light Theme" : "Dark Theme"}
                                   </ListItemText>
                              </ListItemButton>
                         </ListItem>

                         <ListItem>
                              <ListItemButton>
                                   <ListItemIcon>
                                        <Settings />
                                   </ListItemIcon>
                                   <ListItemText>Settings</ListItemText>
                              </ListItemButton>
                         </ListItem>
                         <Divider />

                         {auth && (
                              <>
                                   <ListItem>
                                        <ListItemButton onClick={() => { navigate(`/profile/${auth.id}`); setShowDrawer(false); }}>
                                             <ListItemIcon>
                                                  <ProfileIcon />
                                             </ListItemIcon>
                                             <ListItemText>Profile</ListItemText>
                                        </ListItemButton>
                                   </ListItem>

                                   <ListItem>
                                        <ListItemButton onClick={async () => {
                                             await logout();
                                             setAuth(null);
                                             setShowDrawer(false);
                                             navigate("/login");
                                        }}>
                                             <ListItemIcon>
                                                  <LogoutIcon color="error" />
                                             </ListItemIcon>
                                             <ListItemText>Logout</ListItemText>
                                        </ListItemButton>
                                   </ListItem>
                              </>
                         )}

                         {!auth && (
                              <>
                                   <ListItem>
                                        <ListItemButton onClick={() => { navigate("/register"); setShowDrawer(false); }}>
                                             <ListItemIcon><PersonAddIcon /></ListItemIcon>
                                             <ListItemText>Register</ListItemText>
                                        </ListItemButton>
                                   </ListItem>

                                   <ListItem>
                                        <ListItemButton onClick={() => { navigate("/login"); setShowDrawer(false); }}>
                                             <ListItemIcon><LoginIcon /></ListItemIcon>
                                             <ListItemText>Login</ListItemText>
                                        </ListItemButton>
                                   </ListItem>
                              </>
                         )}
                    </List>
               </Drawer>
          </div>
     )
}