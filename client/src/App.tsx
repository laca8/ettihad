import Header from './components/features/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sports from './pages/sport/Sports'
import Players from './pages/sport/Players'
import Coaches from './pages/sport/Coaches'
import Prizes from './pages/sport/Prizes'
import Staff from './pages/staff/Staff'
import Sponsor from './pages/sponsors/Sponsor'
import Player_Sponsor from './pages/sponsors/Player_Sponsor'
import Club_Sponsor from './pages/sponsors/Club_Player'
import Sport_Sponsor from './pages/sponsors/Sport_Sponsor'
import { ToastContainer } from "react-toastify";
import Infra from './pages/infra/Infra'
import Member from './pages/member/Member'
function App() {

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Header />
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/games' element={<Sports />}>
        </Route>
        <Route path='/players' element={<Players />}>
        </Route>
        <Route path='/coaches' element={<Coaches />}>
        </Route>
        <Route path='/prizes' element={<Prizes />}>
        </Route>
        <Route path='/staff' element={<Staff />}>
        </Route>
        <Route path='/sponsor' element={<Sponsor />}>
        </Route>
        <Route path='/player_sponsor' element={<Player_Sponsor />}>
        </Route>
        <Route path='/sport_sponsor' element={<Sport_Sponsor />}>
        </Route>
        <Route path='/club_sponsor' element={<Club_Sponsor />}>
        </Route>
        <Route path='/infra' element={<Infra />}>
        </Route>
        <Route path='/members' element={<Member />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

