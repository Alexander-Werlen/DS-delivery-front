import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { Toaster } from "@/components/ui/toaster"

import NavBar from './components/NavBar'
import ClientesSection from './components/clientes/ClientesSection'

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <div className='container m-auto'>
        <Routes>
          <Route path="/clientes" element={<ClientesSection />} />
          <Route path="/vendedores" element={<>vendedores</>} />
          <Route path="/itemmenus" element={<>itemmenus</>} />
          <Route path="/pedidos" element={<>pedidos</>} />
          
        </Routes>
      </div>
    </Router>
    <Toaster />
    </>
  )
}

export default App
