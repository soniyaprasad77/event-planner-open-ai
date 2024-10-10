import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.js";
import Navbar from "./components/Navbar.js";
import backgroundImg from "./assets/backgroundImage.webp";

function App() {
  return (
    <>
      <div className="App flex flex-col">
        <Navbar />

        <Outlet />

        <Footer />
      </div>
    </>
  );
}

export default App;
