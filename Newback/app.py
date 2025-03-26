from flask import Flask
from flask_cors import CORS

#fetching scans
from  routes.fetchs.fetchPortScans import fetchPortScan_bp
from routes.fetchs.sysFetch import fetchSynScan_bp
from routes.fetchs.tracefetch import fetchTraceroute_bp
from routes.fetchs.aggfetch import fetchAggressive_bp
from routes.fetchs.customfetch import fetch_custom_scan_bp
from routes.fetchs.firewallfetch import firewall_fetch_bp

from routes.fetchs.outdatedFetch import fetch_outdated_software_bp
from routes.fetchs.fileuploadFetch import fetch_scan_bp
from routes.fetchs.nickto_custom import custom_nikto_fetch_bp
from routes.fetchs.headerFetch import header_fetch_bp

#hydra
from routes.hydra.ssh_bruteforce import ssh_bruteforce_bp
from routes.hydra.ftp_bruteforce import ftp_bruteforce
from routes.hydra.mysql_bruteforce import mysql_bruteforce
from routes.hydra.rdp_bruteforce import rdp_bruteforce
from routes.hydra.custom_bruteforce import custom_bruteforce

#login and register
from routes.register import register_bp
from routes.change_password import change_password_bp
from routes.login import login_bp

#nmap
from routes.nmap_scans.port_scan import scan_bp
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
app.register_blueprint(change_password_bp)

app.register_blueprint(scan_bp,url_prefix="/api")
app.register_blueprint(aggressive_scan_bp, url_prefix="/api")
app.register_blueprint(firewall_scan_bp,url_prefix="/api")
app.register_blueprint(syn_scan_bp, url_prefix="/api")
app.register_blueprint(traceroute_scan_bp, url_prefix="/api")
app.register_blueprint(custom_scan_bp,url_prefix="/api")



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


#fetch
app.register_blueprint(fetchPortScan_bp, url_prefix="/api")
app.register_blueprint(fetchSynScan_bp, url_prefix="/api")
app.register_blueprint(fetchTraceroute_bp, url_prefix="/api")
app.register_blueprint(fetchAggressive_bp, url_prefix="/api")
app.register_blueprint(fetch_custom_scan_bp, url_prefix="/api")
app.register_blueprint(firewall_fetch_bp, url_prefix="/api")

app.register_blueprint(fetch_outdated_software_bp)
app.register_blueprint(fetch_scan_bp)
app.register_blueprint(header_fetch_bp)
app.register_blueprint(custom_nikto_fetch_bp)


if __name__ == '__main__':
    app.run(debug=True)
