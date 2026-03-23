import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function TeacherHeader() {
     const navigate = useNavigate();
     const items = [
          { text: "Dashboard", path: "/teachers/dashboard" },
          { text: "Attendance-Log", path: "/teachers/attendance" },
          { text: "Gradebook", path: "/teachers/grades" },
          { text: "Student-Directory", path: "/teachers/students" },
          { text: "Subject-Material", path: "/teachers/Material" }
     ]
     return (
          <Box sx={{
               display: "flex",
               "justifyContent": "center",
               "alignItems": "center",
               "margin": 3
          }}>
               {items.map(item => (
                    <Typography key={item.text} onClick={() => navigate(item.path)} mx={2} sx={{cursor:"pointer","&:hover":{color : "lightGreen"}}}>
                         {item.text}
                    </Typography>
               ))}
          </Box>
     )
}