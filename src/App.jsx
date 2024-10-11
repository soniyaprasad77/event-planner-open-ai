import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

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
