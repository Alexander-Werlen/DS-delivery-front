import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { Toaster } from "@/components/ui/toaster"

import NavBar from './components/NavBar'
import ClientesSection from './components/clientes/ClientesSection'
import VendedoresSection from './components/vendedores/VendedoresSection'
import ItemsMenuSection from './components/itemsmenu/ItemsMenuSection'
import PedidosSection from './components/pedidos/PedidosSection'

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <div className='container m-auto'>
        <Routes>
          <Route path="/clientes" element={<ClientesSection />} />
          <Route path="/vendedores" element={<VendedoresSection />} />
          <Route path="/itemmenus" element={<ItemsMenuSection />} />
          <Route path="/pedidos" element={<PedidosSection />} />
        </Routes>
      </div>
    </Router>
    <Toaster />
    </>
  )
}

export default App
