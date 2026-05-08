import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import Home from "./pages/Home"
import Store from "./pages/Store"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignupForm from "./pages/SignupForm"
import Dashboard from "./pages/Dashboard"

function App() {
  const location = useLocation()
  return (
    <div>
      {
        location?.pathname !== "/dashboard" &&
        <Header />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {
        location?.pathname !== "/dashboard" &&
        <Footer />
      }
    </div>
  )
}

export default App
