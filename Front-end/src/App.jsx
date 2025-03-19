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
import {CustomScanNt, FileUploadScan, GeneralScan, HeaderScan, NiktoScan, OutdatedSoftwareScan, } from './Components/Nikto'
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
                <Route path='NiktoScan' element={<NiktoScan/>}/>
                <Route path='GeneralScans' element={<GeneralScan/>}/>
                <Route path='HeaderScan' element={<HeaderScan/>}/>
                <Route path='OutdatedSoftwareScan' element={<OutdatedSoftwareScan/>}/>
                <Route path='FileUploadScan' element={<FileUploadScan/>}/>
                <Route path='CustomScanNt' element={<CustomScanNt/>}/>

                {/* hydra  */}
                <Route path='SSHBruteforce' element={<SSHBruteforce/>}/>
                <Route path='FTPBruteforce' element={<FTPBruteforce/>}/>
                <Route path='MySQLBruteforce' element={<MySQLBruteforce/>}/>
                <Route path='RDPBruteforce' element={<RDPBruteforce/>}/>
                <Route path='CustomBruteforce' element={<CustomBruteforce/>}/>

                {/* sqlmap  */}
                <Route path='BasicScan' element={<BasicScan/>}/>
                <Route path='DbEnum' element={<DbEnum/>}/>
                <Route path='TableExtract' element={<TableExtract/>}/>
                <Route path='CustomSQL' element={<CustomSQL/>}/>

                {/* wifi Cracking  */}
                <Route path='ScanNetworks' element={<ScanNetworks/>}/>
                <Route path='CaptureHandshake' element={<CaptureHandshake/>}/>
                <Route path='CrackPassword' element={<CrackPassword/>}/>
                <Route path='DeauthAttack' element={<DeauthAttack/>}/>

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