import { BrowserRouter, Route, Routes } from "react-router-dom";
import MaxWidthWrapper from "./utils/MaxWidthWrapper";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/Home/LandingPage";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Home from "./components/Home/Home";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./utils/Theme";
import Play from "./components/Play/Play";
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MaxWidthWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/play" element={<Play />} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </BrowserRouter>
        </MaxWidthWrapper>
      </ThemeProvider>
    </>
  );
}
