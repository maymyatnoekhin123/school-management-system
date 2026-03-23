import { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../ThemeApp";
import {
     Box, Typography, CircularProgress, TextField, Divider,
     Button, Alert, Container, Paper, Chip
} from "@mui/material";
import { useUpdateTeacher } from "../../hooks/teacherupdate";

// Custom Row Component for consistent alignment and Bilingual support
const FormRow = ({ enLabel, mmLabel, children, required = false, isDark }) => (
     <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 0.5, sm: 3 },
          mb: 3
     }}>
          <Box sx={{ minWidth: { sm: '240px' } }}>
               <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: isDark ? '#f1f5f9' : '#1b5e20' }}>
                    {enLabel} {required && <span style={{ color: '#d32f2f' }}>*</span>}
               </Typography>
               <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500 }}>
                    ({mmLabel})
               </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, width: '100%' }}>
               {children}
          </Box>
     </Box>
);

export default function UpdateTeacher() {
     const { id } = useParams();
     const navigate = useNavigate();
     const { mode, setGlobalMsg } = useApp();
     const isDark = mode === 'dark';

     const { isLoading, error, isError, teacher, handleUpdate } = useUpdateTeacher(id);

     // Refs for Teacher specific fields
     const teacherIdRef = useRef();
     const honorTitleRef = useRef();
     const nrcRef = useRef();
     const dobRef = useRef();
     const qualificationRef = useRef();
     const schoolQualRef = useRef();
     const otherSkillsRef = useRef();
     const phoneRef = useRef();
     const addressRef = useRef();
     const expYearsRef = useRef();
     const joiningDateRef = useRef();

     const formSubmit = e => {
          e.preventDefault();

          // Safety Check for Refs (Optional Chaining)
          const data = {
               teacher_id: Number(teacherIdRef.current?.value || 0),
               honor_title: honorTitleRef.current?.value || "",
               nrc: nrcRef.current?.value || "",
               dob: dobRef.current?.value || "",
               qualification: qualificationRef.current?.value || "",
               school_qualification: schoolQualRef.current?.value || "",
               other_skills: otherSkillsRef.current?.value || "",
               phone: phoneRef.current?.value || "",
               address: addressRef.current?.value || "",
               experience_years: expYearsRef.current?.value || "",
               joining_date: joiningDateRef.current?.value || "",
          };

          handleUpdate(data, id);
          if (setGlobalMsg) setGlobalMsg("ဆရာ/မ အချက်အလက်များ ပြင်ဆင်ပြီးပါပြီ");
          navigate("/admin/users");
     };

     if (isLoading) return (
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
                    bgcolor: isDark ? '#1e293b' : '#fdfdfb', // Pure white or creamy white for parents/teachers
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e8f5e9',
                    boxShadow: isDark ? 'none' : '0 10px 30px rgba(46, 125, 50, 0.05)'
               }}>
                    <Box sx={{ textAlign: 'center', mb: 5 }}>
                         <Typography variant="h4" sx={{ fontWeight: 800, color: '#2e7d32', mb: 1 }}>
                              Update Teacher Profile
                         </Typography>
                         <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                              ဆရာ/ဆရာမ အချက်အလက် ပြင်ဆင်ရန်
                         </Typography>
                    </Box>

                    {isError && (
                         <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                              {error?.message || "ပြင်ဆင်မှု မအောင်မြင်ပါ"}
                         </Alert>
                    )}

                    <form onSubmit={formSubmit}>
                         {/* Basic Info Section */}
                         <Divider sx={{ mb: 4 }}>
                              <Chip label="Personal & Identity / ကိုယ်ရေးအချက်အလက်" size="small" />
                         </Divider>

                         <FormRow enLabel="Full Name" mmLabel="အမည်အပြည့်အစုံ" isDark={isDark}>
                              <TextField
                                   fullWidth
                                   size="small"
                                   value={teacher?.name || ""}
                                   disabled
                                   sx={{ bgcolor: isDark ? 'rgba(0,0,0,0.2)' : '#f5f5f5', borderRadius: '4px' }}
                              />
                         </FormRow>

                         <FormRow enLabel="Honorific Title" mmLabel="ဂုဏ်ထူးဆောင်ဘွဲ့/အမည်" isDark={isDark}>
                              <TextField
                                   fullWidth
                                   size="small"
                                   inputRef={honorTitleRef}
                                   defaultValue={teacher?.honor_title}
                                   placeholder="ဥပမာ - ဆရာတော်၊ ဦး၊ ဒေါ်၊ ဒေါက်တာ"
                              />
                         </FormRow>

                         <FormRow enLabel="NRC Number" mmLabel="မှတ်ပုံတင်အမှတ်" required isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={nrcRef} defaultValue={teacher?.nrc} required />
                         </FormRow>

                         <FormRow enLabel="Date of Birth" mmLabel="မွေးသက္ကရာဇ်" required isDark={isDark}>
                              <TextField
                                   fullWidth
                                   size="small"
                                   type="date"
                                   inputRef={dobRef}
                                   defaultValue={teacher?.dob}
                                   InputLabelProps={{ shrink: true }}
                                   required
                              />
                         </FormRow>

                         {/* Contact Info Section */}
                         <Divider sx={{ my: 4 }}>
                              <Chip label="Contact Details / ဆက်သွယ်ရန်" size="small" />
                         </Divider>

                         <FormRow enLabel="Phone Number" mmLabel="ဖုန်းနံပါတ်" required isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={phoneRef} defaultValue={teacher?.phone} required />
                         </FormRow>

                         <FormRow enLabel="Current Address" mmLabel="နေရပ်လိပ်စာ" required isDark={isDark}>
                              <TextField fullWidth size="small" multiline rows={2} inputRef={addressRef} defaultValue={teacher?.address} required />
                         </FormRow>

                         {/* Professional Info Section */}
                         <Divider sx={{ my: 4 }}>
                              <Chip label="Professional / လုပ်ငန်းအချက်အလက်" size="small" />
                         </Divider>

                         <FormRow enLabel="Teacher ID" mmLabel="ဆရာအိုင်ဒီ" required isDark={isDark}>
                              <TextField fullWidth size="small" type="number" inputRef={teacherIdRef} defaultValue={teacher?.teacher_id} required />
                         </FormRow>

                         <FormRow enLabel="Academic Qualification" mmLabel="အခြေခံပညာအရည်အချင်း" required isDark={isDark}>
                              <TextField fullWidth size="small" inputRef={qualificationRef} defaultValue={teacher?.qualification} required />
                         </FormRow>

                         <FormRow enLabel="School Qualification" mmLabel="ကျောင်းပညာအရည်အချင်း" required isDark={isDark}>
                              <TextField
                                   fullWidth
                                   size="small"
                                   inputRef={schoolQualRef}
                                   defaultValue={teacher?.school_qualification}
                                   required
                              />
                         </FormRow>

                         <FormRow enLabel="Teaching Experience" mmLabel="လုပ်ငန်းအတွေ့အကြုံ (နှစ်)" isDark={isDark}>
                              <TextField
                                   fullWidth
                                   size="small"
                                   inputRef={expYearsRef}
                                   defaultValue={teacher?.experience_years}
                                   placeholder="ဥပမာ - ၅ နှစ်"
                              />
                         </FormRow>

                         <FormRow enLabel="Other Skills" mmLabel="အခြားကျွမ်းကျင်မှုများ" isDark={isDark}>
                              <TextField
                                   fullWidth
                                   size="small"
                                   multiline
                                   rows={2}
                                   inputRef={otherSkillsRef}
                                   defaultValue={teacher?.other_skills}
                              />
                         </FormRow>

                         <FormRow enLabel="Joining Date" mmLabel="စတင်ဝင်ရောက်သည့်ရက်စွဲ" required isDark={isDark}>
                              <TextField
                                   fullWidth
                                   size="small"
                                   type="date"
                                   inputRef={joiningDateRef}
                                   defaultValue={teacher?.joining_date}
                                   InputLabelProps={{ shrink: true }}
                                   required
                              />
                         </FormRow>

                         {/* Action Buttons */}
                         <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                              <Button
                                   variant="outlined"
                                   color="inherit"
                                   onClick={() => navigate(-1)}
                                   sx={{ borderRadius: '12px', px: 4, textTransform: 'none',bgcolor:"red",color:"white" }}
                              >
                                   Cancel (မလုပ်တော့ပါ)
                              </Button>
                              <Button
                                   type="submit"
                                   variant="contained"
                                   sx={{
                                        borderRadius: '12px', px: 6, py: 1.5, fontWeight: 700,
                                        bgcolor: '#2e7d32', textTransform: 'none',color:"white",
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