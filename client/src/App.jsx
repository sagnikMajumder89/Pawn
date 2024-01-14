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
import { AuthRoute } from "./components/Authentication/AuthRoute";
import ReAuthRoute from "./components/Authentication/ReAuthPrevent";
import AddFriend from "./components/Home/AddFriend";
import ProfilePage from "./components/UserProfile/ProfilePage";
import ContactUs from "./components/DevPages/ContactUs";
import PrivacyPolicy from "./components/DevPages/PrivacyPolicy";
import Feedback from "./components/DevPages/Feedback";
import AboutUs from "./components/DevPages/AboutUs";
import Tournaments from "./components/Tournaments/Tournaments";
import Learn from "./components/Learn/Learn";
import Watch from "./components/Watch/Watch";
import { SocketProvider } from "./providers/socketContext";
import { GameDataProvider } from "./providers/gameDataProvider";
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MaxWidthWrapper>
          <SocketProvider>
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
                    <GameDataProvider>
                      <Play />
                    </GameDataProvider>
                  </AuthRoute>
                } />
                <Route path="/play/:roomId" element={
                  <AuthRoute>
                    <GameDataProvider>
                      <Gameboard />
                    </GameDataProvider>
                  </AuthRoute>
                } />
                <Route path="/addFriend" element={
                  <AuthRoute>
                    <AddFriend />
                  </AuthRoute>
                } />
                <Route path="/profile/:id" element={
                  <AuthRoute>
                    <ProfilePage />
                  </AuthRoute>
                } />
                <Route path="/tournaments" element={
                  <AuthRoute>
                    <Tournaments />
                  </AuthRoute>
                } />
                <Route path="/learn" element={
                  <AuthRoute>
                    <Learn />
                  </AuthRoute>
                } />
                <Route path="/feedback" element={
                  <AuthRoute>
                    <Feedback />
                  </AuthRoute>
                } />
                <Route path="/watch" element={
                  <AuthRoute>
                    <Watch />
                  </AuthRoute>
                } />
                <Route path="/contact" element={
                  <ContactUs />
                } />
                <Route path="/about" element={
                  <AboutUs />
                } />
                <Route path="/privacy" element={
                  <PrivacyPolicy />
                } />
                {/* <Route path="/about" element={<About />} /> */}
              </Routes>
            </BrowserRouter>

          </SocketProvider>
        </MaxWidthWrapper >
      </ThemeProvider >
    </>
  );
}
