import { useContext } from 'react'
import{Routes, Route,Navigate} from 'react-router-dom'
import MainSite from './pages/main/Main';
import Shop from './pages/shop/Shop'
import Product from './pages/product/Product'
import NewPost from './pages/creatpost/NewPost';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart'
import Readmore from  './pages/readmore/Readmore'
import Confirmform from './pages/confirmform/Confirmform';
import AuthContext from './context/AuthContext';

function App(){
  const {currentUser} = useContext(AuthContext)
  const admin = false
  const RequireAdmin = ({children})=>{
    return admin?children:<Navigate to="/shop"/>
}
const RequireUser = ({children})=>{
  return currentUser?children:<Navigate to='/shop'/>
}
console.log(currentUser)
  return(
    <Routes>
      <Route path='/' element={<MainSite/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/shop/:category' element={<Shop/>}/>
      <Route path='/readmore' element={<Readmore/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/zaloguj' element={<Login/>}/>
      <Route path='/confirm' element={
        <RequireUser>
          <Confirmform/>
        </RequireUser>
      }/>
      <Route path='/add' element={
        <RequireAdmin>
            <NewPost/>
        </RequireAdmin>
      }/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='*' element={<div>OPS.....Nie ma takiej strony</div>}/>
    </Routes>
  );
}

export default App;
