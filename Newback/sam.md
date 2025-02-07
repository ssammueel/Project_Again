FLASK_APP=app.py FLASK_ENV=development flask run --reload
wathdog is itaianw

nikto_scans/
│── backend/
│   ├── routes/
│   │   ├── general_scan.py        # Basic Web Server Scan
│   │   ├── ssl_scan.py            # SSL/TLS Security Testing
│   │   ├── headers_scan.py        # Security Headers Analysis
│   │   ├── file_upload_scan.py    # Dangerous File Uploads
│   │   ├── outdated_software.py   # Detect Outdated Software
│   │   ├── admin_panel_scan.py    # Check for Admin Pages
│   │   ├── custom_scan.py         # Run User-Specified Nikto Commands
│   ├── utils/
│   │   ├── run_nikto.py
│   ├── __init__.py
│   ├── config.py
│── frontend/
│   ├── components/
│   │   ├── GeneralScan.jsx
│   │   ├── SSLScan.jsx
│   │   ├── HeadersScan.jsx
│   │   ├── FileUploadScan.jsx
│   │   ├── OutdatedSoftware.jsx
│   │   ├── AdminPanelScan.jsx
│   │   ├── CustomScan.jsx
│   ├── pages/
│   │   ├── NiktoDashboard.jsx  # Dashboard to run scans
│   ├── services/
│   │   ├── niktoAPI.js
│── README.md
    

pentest-platform/
│── backend/
│   ├── metasploit/
│   │   ├── exploits.py
│   │   ├── scanners.py
│   │   ├── post_exploitation.py
│   │   ├── persistence.py
│   │   ├── msf_rpc.py
│   ├── routes/
│   │   ├── metasploit_routes.py
│   ├── app.py
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Exploits.jsx
│   │   │   ├── Scanners.jsx
│   │   │   ├── PostExploitation.jsx
│   │   │   ├── Persistence.jsx
│   │   ├── pages/
│   │   │   ├── MetasploitDashboard.jsx
│
│── config/
│── README.md
│── requirements.txt
aded more as in code

hydra/
│── backend/
│   ├── routes/
│   │   ├── ssh_bruteforce.py
│   │   ├── ftp_bruteforce.py
│   │   ├── mysql_bruteforce.py
│   │   ├── rdp_bruteforce.py
│   │   ├── custom_bruteforce.py
│   ├── utils/
│   │   ├── run_hydra.py  # Handles executing Hydra commands
│   │   ├── parse_results.py  # Parses Hydra scan results
│   ├── __init__.py
│   ├── config.py  # Any necessary configurations
│── frontend/
│   ├── components/
│   │   ├── SSHBruteforce.jsx
│   │   ├── FTPBruteforce.jsx
│   │   ├── MySQLBruteforce.jsx
│   │   ├── RDPBruteforce.jsx
│   │   ├── CustomBruteforce.jsx
│   ├── pages/
│   │   ├── HydraDashboard.jsx  # Overview of all Hydra functionalities
│   ├── services/
│   │   ├── hydraAPI.js  # Handles API requests from frontend to backend
│   ├── App.js
│   ├── index.js
│── README.md



sqlmap/
│── backend/
│   ├── routes/
│   │   ├── basic_scan.py
│   │   ├── db_enum.py
│   │   ├── table_extract.py
│   │   ├── custom_sql.py
│   ├── utils/
│   │   ├── run_sqlmap.py  # Executes SQLMap commands
│   │   ├── parse_results.py  # Parses SQLMap output
│   ├── __init__.py
│   ├── config.py
│── frontend/
│   ├── components/
│   │   ├── BasicScan.jsx
│   │   ├── DBEnum.jsx
│   │   ├── TableExtract.jsx
│   │   ├── CustomSQL.jsx
│   ├── pages/
│   │   ├── SQLMapDashboard.jsx
│   ├── services/
│   │   ├── sqlmapAPI.js
│── README.md



aircrack/
│── backend/
│   ├── routes/
│   │   ├── scan_networks.py
│   │   ├── capture_handshake.py
│   │   ├── crack_password.py
│   │   ├── deauth_attack.py
│   ├── utils/
│   │   ├── run_aircrack.py  # Executes Aircrack-ng commands
│   │   ├── parse_results.py  # Parses Aircrack output
│   ├── __init__.py
│   ├── config.py
│── frontend/
│   ├── components/
│   │   ├── NetworkScan.jsx
│   │   ├── CaptureHandshake.jsx
│   │   ├── CrackPassword.jsx
│   │   ├── DeauthAttack.jsx
│   ├── pages/
│   │   ├── AircrackDashboard.jsx
│   ├── services/
│   │   ├── aircrackAPI.js
│── README.md
