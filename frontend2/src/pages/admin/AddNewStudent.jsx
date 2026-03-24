import { useCreateStudent } from "../../hooks/createStudent";
import { useClassrooms } from "../../hooks/classrooms";
import {
     Box, Typography, Alert, TextField, Button, CircularProgress,
     MenuItem, Divider, FormControl, InputLabel, Select, Avatar, IconButton, Paper,
     Checkbox, ListItemText, OutlinedInput, Chip
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function AddNewStudent() {
     const { handleCreate, isLoading } = useCreateStudent();
     const { classrooms } = useClassrooms();
     const [error, setError] = useState(null);
     const navigate = useNavigate();
     const [preview, setPreview] = useState(null);
     const [imageFile, setImageFile] = useState(null);
     const [selectedClassrooms, setSelectedClassrooms] = useState([]);

     // REFS matched to Schema
     const studentIdInput = useRef();
     const nameInput = useRef(); // Maps to your general name logic
     const arabNameInput = useRef();
     const dobInput = useRef();
     const genderInput = useRef();
     const fatherNameInput = useRef();
     const fatherArabNameInput = useRef();
     const motherNameInput = useRef();
     const motherArabNameInput = useRef();
     const relationshipInput = useRef();
     const addressInput = useRef();
     const phoneInput = useRef();
     const isNewInput = useRef();
     const currentEduInput = useRef();
     const previousSchoolInput = useRef();
     const previousClassInput = useRef();

     const handleImageChange = e => {
          const file = e.target.files[0];
          if (file) {
               setImageFile(file);
               setPreview(URL.createObjectURL(file));
          }
     };

     const handleClassroomChange = (event) => {
          const { target: { value } } = event;
          setSelectedClassrooms(typeof value === 'string' ? value.split(',') : value);
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (selectedClassrooms.length === 0) {
               setError("Please select at least one classroom (အနည်းဆုံး အတန်းတစ်ခု ရွေးချယ်ပေးပါ)");
               return;
          }

          const formData = new FormData();
          formData.append("student_id", studentIdInput.current.value);
          formData.append("name", nameInput.current.value);
          formData.append("arabic_name", arabNameInput.current.value);
          formData.append("dob", dobInput.current.value);
          formData.append("gender", genderInput.current.value);
          formData.append("father_name", fatherNameInput.current.value);
          formData.append("father_arabic_name", fatherArabNameInput.current.value);
          formData.append("mother_name", motherNameInput.current.value);
          formData.append("mother_arabic_name", motherArabNameInput.current.value);
          formData.append("relationship", relationshipInput.current.value);
          formData.append("address", addressInput.current.value);
          formData.append("phone", phoneInput.current.value);
          formData.append("isNew", isNewInput.current.value);
          formData.append("current_education", currentEduInput.current.value);
          formData.append("previous_school", previousSchoolInput.current.value);
          formData.append("previous_class", previousClassInput.current.value);

          selectedClassrooms.forEach(id => formData.append("classroom_ids[]", id));
          if (imageFile) formData.append("image", imageFile);

          handleCreate(formData);
          navigate("/admin/users");
     }

     return (
          <Paper elevation={0} sx={{
               maxWidth: 850, mx: 'auto', p: { xs: 2, md: 4 }, mt: 2,
               borderRadius: '16px', border: '1px solid', borderColor: 'divider',
               bgcolor: (theme) => theme.palette.mode === 'light' ? '#fcfcfc' : 'background.paper'
          }}>
               <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
                    Student Registration (ကျောင်းသားအပ်နှံခြင်း)
               </Typography>

               {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

               <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                         <Box sx={{ position: 'relative' }}>
                              <Avatar src={preview} sx={{ width: 110, height: 110, border: '3px solid', borderColor: 'primary.main' }} />
                              <IconButton color="primary" component="label" sx={{ position: 'absolute', bottom: -5, right: -5, bgcolor: 'background.paper', boxShadow: 2 }}>
                                   <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                                   <PhotoCamera />
                              </IconButton>
                         </Box>
                    </Box>

                    <Divider sx={{ mb: 4, fontWeight: 600 }}>BASIC INFO</Divider>

                    <FormRow label="Student ID" mmLabel="ကျောင်းသားနံပါတ်">
                         <TextField fullWidth size="small" type="number" inputRef={studentIdInput} placeholder="Integer only" required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Full Name" mmLabel="အမည်အပြည့်အစုံ">
                         <TextField fullWidth size="small" inputRef={nameInput} placeholder="Enter Name" required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Arabic Name" mmLabel="အာရဗီနာမည်">
                         <TextField fullWidth size="small" inputRef={arabNameInput} placeholder="Enter Arabic Name" sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Date of Birth" mmLabel="မွေးသက္ကရာဇ်">
                         <TextField
                              fullWidth size="small" type="date" inputRef={dobInput}
                              InputLabelProps={{ shrink: true }}
                              required sx={{ bgcolor: 'background.default' }}
                         />
                    </FormRow>

                    <FormRow label="Gender" mmLabel="ကျား/မ">
                         <Select fullWidth size="small" inputRef={genderInput} defaultValue="male" sx={{ bgcolor: 'background.default' }}>
                              <MenuItem value="male">Male (ကျား)</MenuItem>
                              <MenuItem value="female">Female (မ)</MenuItem>
                         </Select>
                    </FormRow>

                    <Divider sx={{ my: 4, fontWeight: 600 }}>EDUCATION</Divider>

                    <FormRow label="Select Classrooms" mmLabel="အတန်းများရွေးချယ်ပါ">
                         <FormControl fullWidth size="small" sx={{ bgcolor: 'background.default' }}>
                              <InputLabel>Choose Classes</InputLabel>
                              <Select
                                   multiple
                                   value={selectedClassrooms}
                                   onChange={handleClassroomChange}
                                   input={<OutlinedInput label="Choose Classes" />}
                                   renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                             {selected.map((value) => (
                                                  <Chip key={value} label={classrooms?.find(c => c.id === value)?.name} size="small" color="primary" variant="outlined" />
                                             ))}
                                        </Box>
                                   )}
                              >
                                   {classrooms?.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                             <Checkbox checked={selectedClassrooms.indexOf(c.id) > -1} />
                                             <ListItemText primary={c.name} />
                                        </MenuItem>
                                   ))}
                              </Select>
                         </FormControl>
                    </FormRow>

                    <FormRow label="Current Education" mmLabel="လက်ရှိပညာအရည်အချင်း">
                         <TextField fullWidth size="small" inputRef={currentEduInput} placeholder="e.g. Grade 11" required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Previous School" mmLabel="ယခင်ကျောင်းအမည်">
                         <TextField fullWidth size="small" inputRef={previousSchoolInput} placeholder="Enter Previous School" sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Previous Class" mmLabel="ယခင်အတန်း">
                         <TextField fullWidth size="small" inputRef={previousClassInput} placeholder="Enter Previous Class" sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Admission Type" mmLabel="ကျောင်းသားသစ်/ဟောင်း">
                         <Select fullWidth size="small" inputRef={isNewInput} defaultValue="yes" sx={{ bgcolor: 'background.default' }}>
                              <MenuItem value="yes">New Student (ကျောင်းသားသစ်)</MenuItem>
                              <MenuItem value="no">Old Student (ကျောင်းသားဟောင်း)</MenuItem>
                         </Select>
                    </FormRow>

                    <Divider sx={{ my: 4, fontWeight: 600 }}>FAMILY & ADDRESS</Divider>

                    <FormRow label="Father Name" mmLabel="ဖခင်အမည်">
                         <TextField fullWidth size="small" inputRef={fatherNameInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Father Arabic Name" mmLabel="ဖခင်အာရဗီအမည်">
                         <TextField fullWidth size="small" inputRef={fatherArabNameInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Mother Name" mmLabel="မိခင်အမည်">
                         <TextField fullWidth size="small" inputRef={motherNameInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Mother Arabic Name" mmLabel="မိခင်အာရဗီအမည်">
                         <TextField fullWidth size="small" inputRef={motherArabNameInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Relationship" mmLabel="တော်စပ်ပုံ">
                         <TextField fullWidth size="small" inputRef={relationshipInput} placeholder="e.g. Parents" sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Phone Number" mmLabel="ဖုန်းနံပါတ်">
                         <TextField fullWidth size="small" inputRef={phoneInput} placeholder="09..." required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Home Address" mmLabel="နေရပ်လိပ်စာ">
                         <TextField fullWidth size="small" multiline rows={2} inputRef={addressInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <Button
                         type="submit" variant="contained" color="primary" fullWidth size="large"
                         disabled={isLoading} sx={{ mt: 3, py: 1.5, borderRadius: '10px', fontWeight: 'bold' }}
                    >
                         {isLoading ? <CircularProgress size={24} color="inherit" /> : 'REGISTER STUDENT (စာရင်းသွင်းမည်)'}
                    </Button>
               </form>
          </Paper>
     )
}