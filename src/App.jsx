import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Page from './components/page';
import PageChat from './components/PageChat';
import SignUpForm from './components/SingUpForm';



function App() {
 
  return (
  
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page/>}></Route> 
      <Route path='/pageChat' element={<PageChat/>}></Route>
      <Route path='/SignUpForm' element={<SignUpForm/>}></Route>
    </Routes>
  </BrowserRouter>

  )
}

export default App;