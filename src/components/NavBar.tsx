import {
  Link
} from 'react-router-dom'


function NavBar() {
  return (
      <nav className='bg-gray-400 w-full'>
        <div className='container m-auto flex'>
          <Link to="/clientes" className='p-4 transition duration-0 hover:duration-150 hover:bg-gray-500'>
            <span className='text-xl'>Clientes</span>
          </Link>
          <Link to="/vendedores" className='p-4 transition duration-0 hover:duration-150 hover:bg-gray-500'>
            <span className='text-xl'>Vendedores</span>
          </Link>
          <Link to="/itemmenus" className='p-4 transition duration-0 hover:duration-150 hover:bg-gray-500'>
            <span className='text-xl'>ItemMenus</span>
          </Link>
          <Link to="/pedidos" className='p-4 transition duration-0 hover:duration-150 hover:bg-gray-500'>
            <span className='text-xl'>Pedidos</span>
          </Link>
          
        </div>
      </nav>
  )
}

export default NavBar
