import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Store from "./pages/Store"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
