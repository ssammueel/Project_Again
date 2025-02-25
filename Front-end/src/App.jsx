import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
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
import { AggressiveScan, CustomScan, Detectos, FirewallScan, PtScan, ServiceScan, SubnetScan, SynScan, TcpScan, TracerouteScan, UdpScan, VulnScan } from './Components/Ports'
import { ExploitSearch } from './features/more/ExploitSearch'
import { Footer } from './Components/Footer'
import { AdminPanelScan, CustomScanNt, FileUploadScan, GeneralScan, HeaderScan, NiktoScan, OutdatedSoftwareScan, SSLScan } from './Components/Nikto'
import { AutoListeners, AuxiliaryScans, Exploits, Listeners, MSFRPC, Payloads, Persistence, PostExploitation, Scanners } from './Components/Metasploit'
import { CustomBruteforce, FTPBruteforce, MySQLBruteforce, RDPBruteforce, SSHBruteforce } from './Components/Hydra'
import { BasicScan, CustomSQL, DbEnum, TableExtract } from './Components/Sqlscan'
import { CaptureHandshake, CrackPassword, DeauthAttack, ScanNetworks } from './Components/Wificracking'
import { Home } from './Home/Home'
import { MainCrausel } from './Home/MainCrausel'
import { ScanResults } from './History/ScanResults'
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
          <Route path='tcpScan' element={<TcpScan/>}/>
          <Route path='UdpScan' element={<UdpScan/>}/>
          <Route path='detectos' element={<Detectos/>} />        
          <Route path='exploit' element={<ExploitSearch/>}/>
          <Route path='ServiceSca' element={<ServiceScan/>} />
          <Route path='SubnetScan' element={<SubnetScan/>}/>
          <Route path='VulnScan' element={<VulnScan/>}/>
          <Route path='AggressiveScan' element={<AggressiveScan/>} />
          <Route path='FirewallScan' element={<FirewallScan/>} />
          <Route path='SynScan' element={<SynScan/>}/>
          <Route path='TracerouteScan' element={<TracerouteScan/>}/>
          <Route path='CustomScan' element={<CustomScan/>}/>
          
          {/* nicto scan  */}
          <Route path='NiktoScan' element={<NiktoScan/>}/>
          <Route path='GeneralScans' element={<GeneralScan/>}/>
          <Route path='SSLScan' element={<SSLScan/>} />
          <Route path='HeaderScan' element={<HeaderScan/>}/>
          <Route path='OutdatedSoftwareScan' element={<OutdatedSoftwareScan/>}/>
          <Route path='FileUploadScan' element={<FileUploadScan/>}/>
          <Route path='AdminPanelScan' element={<AdminPanelScan/>}/>
          <Route path='CustomScanNt' element={<CustomScanNt/>}/>

          {/* metasploit */}
          <Route path='Exploits' element={<Exploits/>}/>
          <Route path='Scanners' element={<Scanners/>}/>
          <Route path='PostExploitation' element={<PostExploitation/>}/>
          <Route path='Persistence' element={<Persistence/>}/>
          <Route path='MSFRPC' element={<MSFRPC/>}/>
          <Route path='Payloads' element={<Payloads/>}/>
          <Route path='AuxiliaryScans' element={<AuxiliaryScans/>}/>
          <Route path='Listeners' element={<Listeners/>}/>
          <Route path='AutoListeners' element={<AutoListeners/>}/>

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
      

      <Route path='/register' element={<Register/>}/>
      <Route path='/documentation' element={<Documentation/>}/>
      <Route path='/history' element={<ScanResults/>}/>
      <Route path='/news' element={<News/>}/>

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