import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import DarkModeProvider  from "./context/ThemeContext"

function App() {

  return (
    <>
      <DarkModeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/createPage" element={<CreatePage />}></Route>
        </Routes>
      </DarkModeProvider>
    </>
  )
}

export default App;
