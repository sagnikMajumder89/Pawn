import { BrowserRouter, Route, Routes } from "react-router-dom";
import MaxWidthWrapper from "./utils/MaxWidthWrapper";
import LandingPage from "./components/Home/LandingPage";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Home from "./components/Home/Home";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./utils/Theme";
import Play from "./components/Play/Play";
import Gameboard from "./components/Play/Gameboard";
import AuthRoute from "./components/Authentication/AuthRoute";
import ReAuthRoute from "./components/Authentication/ReAuthPrevent";
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MaxWidthWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={
                <ReAuthRoute>
                  <Login />
                </ReAuthRoute>
              } />
              <Route path="/signup" element={
                <ReAuthRoute>
                  <Signup />
                </ReAuthRoute>
              } />
              <Route path="/home" element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              } />
              <Route path="/play" element={
                <AuthRoute>
                  <Play />
                </AuthRoute>
              } />
              <Route path="/play/:id" element={
                <AuthRoute>
                  <Gameboard />
                </AuthRoute>
              } />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </BrowserRouter>
        </MaxWidthWrapper>
      </ThemeProvider>
    </>
  );
}
