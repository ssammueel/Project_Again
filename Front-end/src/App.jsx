import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Login } from './Components/Login'
import {Me} from './profile/Me'
import { Features } from './features/Features'
import { Register } from './Components/Register'
import { Header } from './Components/Header'
import { ProtectedRoute } from './features/ProtectedRoute'
import { Documentation } from './documentation/Documentation'
import { News } from './news/News'
import { ChangePassword } from './profile/ChangePassword'
import { ChangePic } from './profile/ChangePic'
import { AggressiveScan, Detectos, FirewallScan, PtScan, Ranget, ServiceScan, SubnetScan, SynScan, TcpScan, TracerouteScan, UdpScan, VulnScan } from './Components/Ports'
import { ExploitSearch } from './features/more/ExploitSearch'

function App() {
  

  return (
    <div className=''>
<BrowserRouter>
<Header/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>

      <Route path='/login' element={<Login/>}/>
      <Route element={<ProtectedRoute/>}>
          <Route path='/features' element={<Features/>}>
          <Route path='' element={<PtScan/>}/>
          <Route path='ptScan' element={<PtScan/>}/>
          <Route path='tcpScan' element={<TcpScan/>}/>
          <Route path='UdpScan' element={<UdpScan/>}/>
          <Route path='detectos' element={<Detectos/>} />
          <Route path='ranget' element={<Ranget/>}/>
          <Route path='exploit' element={<ExploitSearch/>}/>
          <Route path='ServiceSca' element={<ServiceScan/>} />
          <Route path='SubnetScan' element={<SubnetScan/>}/>
          <Route path='VulnScan' element={<VulnScan/>}/>
          <Route path='AggressiveScan' element={<AggressiveScan/>} />
          <Route path='FirewallScan' element={<FirewallScan/>} />
          <Route path='SynScan' element={<SynScan/>}/>
          <Route path='TracerouteScan' element={<TracerouteScan/>}/>
    
              
          </Route>
      </Route>
      

      <Route path='/register' element={<Register/>}/>
      <Route path='/documentation' element={<Documentation/>}/>
      <Route path='/news' element={<News/>}/>

      <Route path='/me' element={<Me/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route path='/changepic' element={<ChangePic/>}/>

    </Routes>

</BrowserRouter>

      
    </div>
  )
}

export default App
