import {
     Box,
     AppBar,
     Toolbar,
     Typography,
     Icon,
     IconButton,
} from "@mui/material"

import { useNavigate } from "react-router-dom"

export default function StudentHeader() {

     const navigate = useNavigate();
     const items = [
          { text: "Dashboard", "path": "/students/dashboard" },
          { text: "My Grades", "path": "/students/grades" },
          { text: "Attendance-Record", "path": "/students/attendance" },
          { text: "Subject List", "path": "/students/subject" },
     ]
     return (
          <Box sx={{
               display: "flex",
               "justifyContent": "center",
               "alignItems": "center",
               "margin": 3
          }}>
               {items.map(item => (
                    <Typography key={item.text} onClick={() => navigate(item.path)} sx={{
                         "marginX": 3, padding: 2, "&:hover": {
                              color: "green"
                         },
                         cursor : "pointer"
                    }}>
                         {item.text}
                    </Typography>
               ))}
          </Box>
     )
}