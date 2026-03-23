import React from 'react';
import {
     Dialog, DialogTitle, DialogContent, DialogActions,
     Button, Typography, Box
} from '@mui/material';
import { WarningAmber as WarningIcon } from '@mui/icons-material';

const ConfirmDeleteModal = ({ open, onClose, onConfirm, itemName }) => {
     return (
          <Dialog
               open={open}
               onClose={onClose}
               PaperProps={{
                    sx: {
                         borderRadius: '16px',
                         p: 1,
                         bgcolor: '#ffffff', // Background strictly white
                         backgroundImage: 'none',
                         boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
                    }
               }}
          >
               <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
                    <WarningIcon sx={{ color: '#ef4444' }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#000000' }}>
                         Confirm Delete
                    </Typography>
               </DialogTitle>

               <DialogContent>
                    <Typography sx={{ color: '#000000', mb: 1, fontSize: '1rem' }}>
                         Are you sure you want to delete <b>{itemName}</b>? This action cannot be undone.
                    </Typography>

                    {/* Red Warning box stays same for emphasis */}
                    <Typography sx={{
                         bgcolor: '#fef2f2',
                         color: '#ef4444',
                         p: 2,
                         borderRadius: '12px',
                         fontSize: '0.9rem',
                         fontWeight: 600,
                         border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                         ဤအသုံးပြုသူကို ဖျက်ရန် သေချာပါသလား? ဤလုပ်ဆောင်ချက်ကို ပြန်ပြင်၍မရနိုင်ပါ။
                    </Typography>
               </DialogContent>

               <DialogActions sx={{ p: 3, pt: 1, gap: 1.5 }}>
                    <Button
                         onClick={onClose}
                         variant="text"
                         sx={{
                              borderRadius: '10px',
                              textTransform: 'none',
                              px: 3,
                              color: '#64748b', // Subtle grey for cancel
                              fontWeight: 600,
                              '&:hover': { bgcolor: '#f1f5f9' }
                         }}
                    >
                         Cancel (မလုပ်တော့ပါ)
                    </Button>
                    <Button
                         onClick={onConfirm}
                         variant="contained"
                         sx={{
                              bgcolor: '#ef4444', // Red button stays red
                              color: '#ffffff',
                              borderRadius: '10px',
                              textTransform: 'none',
                              px: 4,
                              fontWeight: 700,
                              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                              '&:hover': { bgcolor: '#dc2626', boxShadow: 'none' }
                         }}
                    >
                         Yes, Delete (ဖျက်မည်)
                    </Button>
               </DialogActions>
          </Dialog>
     );
};

export default ConfirmDeleteModal;