import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"
import Home from "./pages/Home/Home"
import Recipe from './pages/Recipe/Recipe'
import Modal from './component/Modal/Modal'
import { RecipeCreate } from './component/RecipeCreate/RecipeCreate'
import { Sidebar } from './component/Sidebar/Sidebar'

function App(){
  return(
    <BrowserRouter>
     <Modal>
        <RecipeCreate/>
      </Modal>
     <Header/>
    <main className="main">
      <Sidebar/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/recipe" element={<Recipe/>}/>
      </Routes>
    </main>
    <Footer/>
    </BrowserRouter>
  )
}

export default App