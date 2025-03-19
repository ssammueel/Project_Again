from flask import Flask
from flask_cors import CORS

#fetching scans
from  routes.fetchs.fetchPortScans import fetchPortScan_bp
from routes.fetchs.sysFetch import fetchSynScan_bp

# wificracking 
from routes.wificracking.scan_networks import scan_networks
from routes.wificracking.capture_handshake import capture_handshake
from routes.wificracking.crack_password import crack_password
from routes.wificracking.deauth_attack import deauth_attack

# sqlmap 
from routes.sqlmap.basic_scan import basic_scan
from routes.sqlmap.db_enum import db_enum
from routes.sqlmap.table_extract import table_extract
from routes.sqlmap.custom_sql import custom_sql

#hydra
from routes.hydra.ssh_bruteforce import ssh_bruteforce_bp
from routes.hydra.ftp_bruteforce import ftp_bruteforce
from routes.hydra.mysql_bruteforce import mysql_bruteforce
from routes.hydra.rdp_bruteforce import rdp_bruteforce
from routes.hydra.custom_bruteforce import custom_bruteforce

#login and register
from routes.register import register_bp
from routes.login import login_bp

#nmap
from routes.nmap_scans.port_scan import scan_bp
from routes.nmap_scans.subnet_scan import subnet_scan_bp
from routes.nmap_scans.aggressive_scan import aggressive_scan_bp
from routes.nmap_scans.firewall_evasion_scan import firewall_scan_bp
from routes.nmap_scans.syn_scan import syn_scan_bp
from routes.nmap_scans.traceroute_scan import traceroute_scan_bp
from routes.nmap_scans.nmap_custom import custom_scan_bp

#nickto
from routes.nickto_scans.general_scan import general_scan_bp
from routes.nickto_scans.nikto_header_scan import nikto_header_bp
from routes.nickto_scans.outdated_software import nikto_outdated_bp
from routes.nickto_scans.file_upload_scan import upload_scan_bp
from routes.nickto_scans.nkt_custom import nkt_custom_bp

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app) 

# nmap 
app.register_blueprint(register_bp, url_prefix="/api")
app.register_blueprint(login_bp, url_prefix="/api")

app.register_blueprint(scan_bp,url_prefix="/api")
app.register_blueprint(subnet_scan_bp, url_prefix="/api")
app.register_blueprint(aggressive_scan_bp, url_prefix="/api")
app.register_blueprint(firewall_scan_bp,url_prefix="/api")
app.register_blueprint(syn_scan_bp, url_prefix="/api")
app.register_blueprint(traceroute_scan_bp, url_prefix="/api")
app.register_blueprint(custom_scan_bp,url_prefix="/api")
#fetch
app.register_blueprint(fetchPortScan_bp, url_prefix="/api")
app.register_blueprint(fetchSynScan_bp, url_prefix="/api")

# nicto scan
app.register_blueprint(general_scan_bp)
app.register_blueprint(nikto_header_bp)
app.register_blueprint(nikto_outdated_bp)
app.register_blueprint(upload_scan_bp)
app.register_blueprint(nkt_custom_bp)

#hydra
app.register_blueprint(ssh_bruteforce_bp, url_prefix="/hydra")
app.register_blueprint(ftp_bruteforce, url_prefix="/hydra")
app.register_blueprint(mysql_bruteforce, url_prefix="/hydra")
app.register_blueprint(rdp_bruteforce, url_prefix="/hydra")
app.register_blueprint(custom_bruteforce, url_prefix="/hydra")

# sqlmap 
app.register_blueprint(basic_scan, url_prefix="/sqlmap")
app.register_blueprint(db_enum, url_prefix="/sqlmap")
app.register_blueprint(table_extract, url_prefix="/sqlmap")
app.register_blueprint(custom_sql, url_prefix="/sqlmap")

# wifi cracking 
app.register_blueprint(scan_networks, url_prefix="/aircrack")
app.register_blueprint(capture_handshake, url_prefix="/aircrack")
app.register_blueprint(crack_password, url_prefix="/aircrack")
app.register_blueprint(deauth_attack, url_prefix="/aircrack")


if __name__ == '__main__':
    app.run(debug=True)
