import React from "react";
import AppRouter from "./components/AppRouter";
import "./App.css";

import BookingPage from "./pages/BookingPage";

// import AuthProvider from "./contexts/Auth.context";
// import CustomThemeProvider from "./contexts/CustomTheme.context";

export default React.memo(function App() {
  return (
    <MainApp />
    // <AuthProvider>
    // {/* <CustomThemeProvider> */}
    // <MainApp />
    // </CustomThemeProvider>
    // </AuthProvider>
  );
});

function MainApp() {
  return (
    <div>
      <AppRouter />
      <BookingPage/>
    </div>
  );
}
