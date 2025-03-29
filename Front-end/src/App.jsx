import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Login } from './Components/Login'
import {Me} from './profile/Me'
import { Features } from './features/Features'
import { Register } from './Components/Register'
import { Header } from './Components/Header'
import { ProtectedRoute } from './features/ProtectedRoute'
import { Documentation } from './documentation/Documentation'
import { ChangePassword } from './profile/ChangePassword'
import { ChangePic } from './profile/ChangePic'
import { AggressiveScan, CustomScan, FirewallScan, PtScan, SynScan, TracerouteScan} from './Components/Ports'
import { ExploitSearch } from './features/more/ExploitSearch'
import { Footer } from './Components/Footer'
import {FileUploadScan, GeneralScan, HeaderScan, OutdatedSoftwareScan, } from './Components/Nikto'
import { CustomBruteforce, FTPBruteforce, MySQLBruteforce, RDPBruteforce, SSHBruteforce } from './Components/Hydra'
import { BasicScan, CustomSQL, DbEnum, TableExtract } from './Components/Sqlscan'
import { CaptureHandshake, CrackPassword, DeauthAttack, ScanNetworks } from './Components/Wificracking'
import { Home } from './Home/Home'
import { ScanResults } from './History/ScanResults'
import { PortRst } from './History/port_rst'
import { Syn_history } from './History/Syn_history'
import { TracertHistory } from './History/TracertHistory'
import { FirewallHistory } from './History/FirewallHistory'
import { AggHistory } from './History/AggHistory'
import { CustomHistory } from './History/CustomHistory'
import { Generalhistory } from './History/Generalhistory'
import { Outdated } from './History/OutdatedFetch'
import { FileHistory } from './History/FileuploadHistory'
import { HeaderHistory } from './History/HeaderHistory'
function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Header/>
          <Routes>

            <Route path='/' element={<Home/>}/>
            {/* <Route path='/' element={<MainCrausel/>}/> */}
            <Route path='/home' element={<Home/>}/>

            <Route path='/login' element={<Login/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path='/features' element={<Features/>}>
                  <Route path='' element={<PtScan/>}/>
                  <Route path='ptScan' element={<PtScan/>}/>
                  <Route path='AggressiveScan' element={<AggressiveScan/>} />
                  <Route path='FirewallScan' element={<FirewallScan/>} />
                  <Route path='SynScan' element={<SynScan/>}/>
                  <Route path='TracerouteScan' element={<TracerouteScan/>}/>
                  <Route path='CustomScan' element={<CustomScan/>}/>
                  
                  {/* nicto scan  */}
                  <Route path='GeneralScans' element={<GeneralScan/>}/>
                  <Route path='HeaderScan' element={<HeaderScan/>}/>
                  <Route path='OutdatedSoftwareScan' element={<OutdatedSoftwareScan/>}/>
                  <Route path='FileUploadScan' element={<FileUploadScan/>}/>

                </Route>

                <Route path='/history' element={<ScanResults/>}>
                  <Route path='' element={<PortRst/>}/>

                  <Route path='port' element={<PortRst/>}/>
                  <Route path='Syn_history' element={<Syn_history/>}/>
                  <Route path='TracertHistory'element={<TracertHistory/>}/>
                  <Route path='FirewallHistory' element={<FirewallHistory/>}/>
                  <Route path='AggHistory' element={<AggHistory/>}/>
                  <Route path='CustomHistory' element={<CustomHistory/>}/>

                  <Route path='Generalhistory' element={<Generalhistory/>}/>
                  <Route path='HeaderHistory' element={<HeaderHistory/>}/>
                  <Route path='FileHistory' element={<FileHistory/>}/>
                  <Route path='Outdated' element={<Outdated/>}/>
                </Route>
              </Route>

            {/* history  */}
            <Route path='/history' element={<ScanResults/>}>
              <Route path='' element={<PortRst/>}/>

              <Route path='port' element={<PortRst/>}/>
              <Route path='Syn_history' element={<Syn_history/>}/>
              <Route path='TracertHistory'element={<TracertHistory/>}/>
              <Route path='FirewallHistory' element={<FirewallHistory/>}/>
              <Route path='AggHistory' element={<AggHistory/>}/>
              <Route path='CustomHistory' element={<CustomHistory/>}/>

              <Route path='Generalhistory' element={<Generalhistory/>}/>
              <Route path='HeaderHistory' element={<HeaderHistory/>}/>
              <Route path='FileHistory' element={<FileHistory/>}/>
              <Route path='Outdated' element={<Outdated/>}/>
              
              
            </Route>
            

            <Route path='/register' element={<Register/>}/>
            <Route path='/documentation' element={<Documentation/>}/>
            
            <Route path='/me' element={<Me/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>
            <Route path='/changepic' element={<ChangePic/>}/>

          </Routes>

      </BrowserRouter>
<Footer/>
      
    </div>
  )
}

export default App