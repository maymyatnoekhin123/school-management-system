import { Box, Container, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";
import { useApp } from "./ThemeApp";

export default function Template() {
     const { globalMsg, setGlobalMsg } = useApp();

     return (
          <Box>
               <Header />
               <AppDrawer />
               <Container
                    maxWidth="lg"
                    sx={{
                         mt: { xs: 10, sm: 12 }, // Append: Mobile 10, Desktop 12
                         mb: 4,
                         px: { xs: 1, sm: 3 } // Append: Mobile မှာ ဘေးဘောင်ကျဉ်းရန်
                    }}
               >
                    <Outlet />
               </Container>

               <Snackbar
                    anchorOrigin={{
                         horizontal: "center",
                         vertical: "bottom"
                    }}
                    open={Boolean(globalMsg)}
                    autoHideDuration={6000}
                    onClose={() => setGlobalMsg(null)}
                    message={globalMsg} />
          </Box>
     );
}