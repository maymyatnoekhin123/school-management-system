import {
     Box,
     AppBar,
     Toolbar,
     Typography,
     Icon,
     IconButton,
} from "@mui/material"

import { useNavigate } from "react-router-dom"

export default function AdminHeader() {
     const navigate = useNavigate();
     const items = [
          { text: "Dashboard", "path": "/admin/dashboard" },
          { text: "Classrooms", "path": "/admin/classrooms" },
          { text: "User Management", "path": "/admin/users" },
          { text: "Register Student", path: "/admin/students/register" },
          { text: "Register Teacher", path: "/admin/teachers/register" },
     ]
     return (
          <Box sx={{
               display: "flex",
               flexWrap: "wrap", // Append
               justifyContent: "center",
               alignItems: "center",
               margin: { xs: 1, sm: 3 }, // Append
               gap: 1 // Append
          }}>
               {items.map(item => (
                    <Typography
                         key={item.text}
                         onClick={() => navigate(item.path)}
                         sx={{
                              marginX: { xs: 1, sm: 2 },
                              fontSize: { xs: "0.85rem", sm: "1rem" }, // Append
                              "&:hover": { "backgroundColor": "green", "color": "white", borderRadius: 3 },
                              cursor: "pointer",
                              padding: { xs: 1, sm: 2 }
                         }}
                    >
                         {item.text}
                    </Typography>
               ))}
          </Box>
     )
}

// { text: "Classrooms", "path": "/admin/classrooms" },
// { text: "Exam Terms", "path": "/admin/exams" },