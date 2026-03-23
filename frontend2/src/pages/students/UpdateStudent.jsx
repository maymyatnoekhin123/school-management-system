import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../../ThemeApp";
import { useEditStudent } from "../../hooks/studentupdate";
import { useClassrooms } from "../../hooks/classrooms";
import { useRef, useState, useEffect } from "react";
import {
     Box, Typography, CircularProgress, TextField, Divider,
     Select, MenuItem, Button,
     Paper, Container, Chip, OutlinedInput,
} from "@mui/material";

// Custom Row Component for consistent alignment and Bilingual support
const FormRow = ({ enLabel, mmLabel, children, required = false, isDark }) => (
     <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 0.5, sm: 3 },
          mb: 3
     }}>
          <Box sx={{ minWidth: { sm: '220px' } }}>
               <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                    {enLabel} {required && <span style={{ color: '#ef4444' }}>*</span>}
               </Typography>
               <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 500 }}>
                    ({mmLabel})
               </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, width: '100%' }}>
               {children}
          </Box>
     </Box>
);

export default function UpdateStudent() {
     const { id } = useParams();
     const navigate = useNavigate();
     const { mode, setGlobalMsg } = useApp();
     const isDark = mode === 'dark';

     // Form Refs for all fields
     const studentIdRef = useRef();
     const dobRef = useRef();
     const fatherNameRef = useRef();
     const motherNameRef = useRef();
     const addressRef = useRef();
     const phoneRef = useRef();
     const fatherOccupationRef = useRef();
     const currentEducationRef = useRef();
     const otherQualificationRef = useRef();
     const reasonRef = useRef();

     const [gender, setGender] = useState("");
     const [selectedClassrooms, setSelectedClassrooms] = useState([]);

     const { handleUpdate, isLoading, data } = useEditStudent(id);
     const { classrooms, isCLoading } = useClassrooms();

     // Sync data from API to state
     useEffect(() => {
          if (data) {
               setGender(data.gender || "");
               if (data.user?.classrooms) {
                    const currentIds = data.user.classrooms.map(room => room.id);
                    setSelectedClassrooms(currentIds);
               }
          }
     }, [data]);

     const formSubmit = (e) => {
          e.preventDefault();

          // Use optional chaining (?.) to prevent "undefined" errors if a ref is missing
          const updateData = {
               student_id: Number(studentIdRef.current?.value || 0),
               dob: dobRef.current?.value,
               gender: gender,
               father_name: fatherNameRef.current?.value,
               mother_name: motherNameRef.current?.value,
               address: addressRef.current?.value,
               phone: phoneRef.current?.value,
               father_occupation: fatherOccupationRef.current?.value,
               current_education: currentEducationRef.current?.value,
               other_qualification: otherQualificationRef.current?.value,
               reason_of_join: reasonRef.current?.value,
               classroom_ids: selectedClassrooms
          };

          handleUpdate(updateData, id);
          setGlobalMsg("ကျောင်းသားအချက်အလက် ပြင်ဆင်ပြီးပါပြီ");
          navigate("/admin/users");
     };

     if (isLoading || isCLoading) return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
               <CircularProgress color="success" />
               <Typography sx={{ ml: 2 }}>အချက်အလက်များ ရယူနေပါသည်...</Typography>
          </Box>
     );

     return (
          <Container maxWidth="md" sx={{ py: 4 }}>
               <Paper elevation={0} sx={{
                    p: { xs: 2, md: 5 },
                    borderRadius: '24px',
                    bgcolor: isDark ? '#1e293b' : '#ffffff',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                    boxShadow: isDark ? 'none' : '0 10px 40px rgba(0,0,0,0.03)'
               }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 5, color: '#2e7d32', textAlign: 'center' }}>
                         Update Student Profile (ကျောင်းသားအချက်အလက်ပြင်ဆင်ရန်)
                    </Typography>

                    <form onSubmit={formSubmit}>
                         {/* Academic Section */}
                         <Divider sx={{ mb: 4 }}><Chip label="School Records / ကျောင်းမှတ်တမ်း" size="small" /></Divider>

                         <FormRow enLabel="Student ID" mmLabel="ကျောင်းသားမှတ်ပုံတင်အမှတ်" required isDark={isDark}>
                              <TextField fullWidth size="small" type="number" inputRef={studentIdRef} defaultValue={data?.student_id} required />
                         </FormRow>

                         <FormRow enLabel="Classrooms" mmLabel="တက်ရောက်နေသည့်အတန်းများ" required isDark={isDark}>
                              <Select
                                   fullWidth multiple size="small"
                                   value={selectedClassrooms}
                                   onChange={(e) => setSelectedClassrooms(e.target.value)}
                                   input={<OutlinedInput />}
                                   renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                             {selected.map((val) => {
                                                  const room = classrooms?.find(c => c.id === val);
                                                  return <Chip key={val} label={room?.name || `L-${val}`} size="small" color="success" sx={{ fontWeight: 600 }} />;
                                             })}
                                        </Box>
                                   )}
                              >
                                   {classrooms?.map((room) => (
                                        <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                                   ))}
                              </Select>
                         </FormRow>

                         {/* Personal Section */}
                         <Divider sx={{ my: 4 }}><Chip label="Personal Information / ကိုယ်ရေးအချက်အလက်" size="small" /></Divider>

                         <FormRow enLabel="Date of Birth" mmLabel="မွေးသက္ကရာဇ်" required isDark={isDark}>
                              <TextField fullWidth size="small" type="date" inputRef={dobRef} defaultValue={data?.dob} InputLabelProps={{ shrink: true }} required />
                         </FormRow>

                         <FormRow enLabel="Gender" mmLabel="ကျား/မ" required isDark={isDark}>
                              <Select fullWidth size="small" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                   <MenuItem value="male">Male (ကျား)</MenuItem>
                                   <MenuItem value="female">Female (မ)</MenuItem>
                              </Select>
                         </FormRow>

                         <FormRow enLabel="Father Name" mmLabel="ဖခင်အမည်" required isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={fatherNameRef} defaultValue={data?.father_name} required />
                         </FormRow>

                         <FormRow enLabel="Mother Name" mmLabel="မိခင်အမည်" required isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={motherNameRef} defaultValue={data?.mother_name} required />
                         </FormRow>

                         <FormRow enLabel="Father Occupation" mmLabel="ဖခင်၏အလုပ်အကိုင်" isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={fatherOccupationRef} defaultValue={data?.father_occupation} />
                         </FormRow>

                         <FormRow enLabel="Phone Number" mmLabel="ဆက်သွယ်ရန်ဖုန်း" required isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={phoneRef} defaultValue={data?.phone} required />
                         </FormRow>

                         <FormRow enLabel="Address" mmLabel="နေရပ်လိပ်စာ" required isDark={isDark}>
                              <TextField fullWidth size="small" multiline rows={2} inputRef={addressRef} defaultValue={data?.address} required />
                         </FormRow>

                         {/* Education Section */}
                         <Divider sx={{ my: 4 }}><Chip label="Education / ပညာအရည်အချင်း" size="small" /></Divider>

                         <FormRow enLabel="Current Education" mmLabel="လက်ရှိပညာအရည်အချင်း" required isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={currentEducationRef} defaultValue={data?.current_education} required />
                         </FormRow>

                         <FormRow enLabel="Other Qualification" mmLabel="အခြားအရည်အချင်းများ" isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={otherQualificationRef} defaultValue={data?.other_qualification} />
                         </FormRow>

                         <FormRow enLabel="Reason to Join" mmLabel="တက်ရောက်လိုသည့်အကြောင်းအရင်း" required isDark={isDark}>
                              <TextField fullWidth size="small" multiline rows={3} inputRef={reasonRef} defaultValue={data?.reason_of_join} required />
                         </FormRow>

                         {/* Action Buttons */}
                         <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                              <Button
                                   variant="outlined"
                                   color="inherit"
                                   onClick={() => navigate(-1)}
                                   sx={{ borderRadius: '12px', px: 4, textTransform: 'none' ,bgcolor:"red",color:"white"}}
                              >
                                   Cancel (မလုပ်တော့ပါ)
                              </Button>
                              <Button
                                   type="submit"
                                   variant="contained"
                                   sx={{
                                        borderRadius: '12px', px: 6, py: 1.2,
                                        bgcolor: '#2e7d32', fontWeight: 700,color:"white",
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#1b5e20' }
                                   }}
                              >
                                   Save Update (ပြင်ဆင်မည်)
                              </Button>
                         </Box>
                    </form>
               </Paper>
          </Container>
     );
}