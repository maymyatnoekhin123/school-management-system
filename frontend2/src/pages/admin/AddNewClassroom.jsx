import {
     Box, Typography, Alert, TextField, Button, CircularProgress,
     Paper, Divider
} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClassrooms } from "../../hooks/classrooms";

// Form Layout Component
const FormRow = ({ label, mmLabel, children }) => (
     <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          gap: { xs: 0.5, sm: 2 },
          mb: 3
     }}>
          <Box sx={{ minWidth: { sm: '200px' } }}>
               <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.95rem' }}>
                    {label}
               </Typography>
               <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                    ({mmLabel})
               </Typography>
          </Box>
          <Box sx={{ flex: 1, width: '100%' }}>{children}</Box>
     </Box>
);

export default function AddNewClassroom() {
     // Hook ထဲမှ လိုအပ်သည်များကို Destructure လုပ်ယူခြင်း
     const {
          isCLoading,
          handleCreateClassroom
     } = useClassrooms();

     const [error, setError] = useState(null);
     const navigate = useNavigate();
     const nameInput = useRef();

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError(null);

          const classroomName = nameInput.current.value;

          if (!classroomName) {
               setError("Classroom name is required");
               return;
          }

          try {
               // handleCreateClassroom ထဲသို့ အတန်းအမည်ကို တိုက်ရိုက်ပို့ပေးပါ
               handleCreateClassroom(classroomName);

               // ခဏစောင့်ပြီး List စာမျက်နှာသို့ ပြန်သွားပါ
               setTimeout(() => {
                    navigate("/admin/classrooms");
               }, 500);

          } catch (err) {
               setError(err.message || "Something went wrong");
          }
     }

     return (
          <Paper elevation={0} sx={{
               maxWidth: 600,
               mx: 'auto',
               p: { xs: 2, md: 4 },
               mt: 4,
               borderRadius: '16px',
               border: '1px solid',
               borderColor: 'divider',
          }}>
               <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
                    Create New Classroom
               </Typography>

               {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

               <form onSubmit={handleSubmit}>
                    <Divider sx={{ mb: 4, fontWeight: 600 }}>CLASSROOM DETAILS</Divider>

                    <FormRow label="Classroom Name" mmLabel="အတန်းအမည်">
                         <TextField
                              fullWidth
                              size="small"
                              inputRef={nameInput}
                              placeholder="e.g. Grade 10 - Section A"
                              required
                              sx={{ bgcolor: 'background.default' }}
                         />
                    </FormRow>

                    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                         <Button
                              variant="outlined"
                              fullWidth
                              size="large"
                              onClick={() => navigate(-1)}
                              sx={{ py: 1.5, fontWeight: 'bold', borderRadius: '8px' }}
                         >
                              CANCEL
                         </Button>
                         <Button
                              type="submit"
                              variant="contained"
                              fullWidth
                              size="large"
                              disabled={isCLoading}
                              sx={{
                                   py: 1.5,
                                   fontWeight: 'bold',
                                   borderRadius: '8px',
                                   boxShadow: 'none',
                                   '&:hover': {
                                        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                        backgroundColor: 'primary.dark'
                                   }
                              }}
                         >
                              {isCLoading ? (
                                   <CircularProgress size={24} color="inherit" />
                              ) : (
                                   'CREATE CLASSROOM'
                              )}
                         </Button>
                    </Box>
               </form>
          </Paper>
     )
}