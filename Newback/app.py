from flask import Flask
from flask_cors import CORS

from routes.register import register_bp
from routes.login import login_bp
from routes.nmap_scans.os_scan import os_scan_bp
from routes.nmap_scans.port_scan import scan_bp
from routes.nmap_scans.exploit_search import search_bp
from routes.nmap_scans.payload_generator import payload_gen_bp
from routes.nmap_scans.service_version_scan import service_scan_bp
from routes.nmap_scans.subnet_scan import subnet_scan_bp
from routes.nmap_scans.vuln_scan import vuln_scan_bp
from routes.nmap_scans.aggressive_scan import aggressive_scan_bp
from routes.nmap_scans.firewall_evasion_scan import firewall_scan_bp
from routes.nmap_scans.udp_scan import udp_scan_bp
from routes.nmap_scans.syn_scan import syn_scan_bp
from routes.nmap_scans.traceroute_scan import traceroute_scan_bp
from routes.nmap_scans.nmap_custom import custom_scan_bp

#nickto
from routes.nickto_scans.general_scan import general_scan_bp
from routes.nickto_scans.ssl_scan import ssl_scan_bp
from routes.nickto_scans.nikto_header_scan import nikto_header_bp
from routes.nickto_scans.outdated_software import nikto_outdated_bp
from routes.nickto_scans.file_upload_scan import upload_scan_bp
from routes.nickto_scans.admin_panel_scan import admin_panel_bp
from routes.nickto_scans.custom_scan import nickto_custom_bp

# sploit
from routes.metasploit.exploits import exploits_bp
from routes.metasploit.scanner import sploit_scanners_bp
from routes.metasploit.post_exploitation import post_exploit_bp
from routes.metasploit.persistence import persistence_bp
from routes.metasploit.msf_rpc import msf_rpc_bp
from routes.metasploit.payloads import payloads_bp

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app) 

# nmap 
app.register_blueprint(register_bp)
app.register_blueprint(login_bp)
app.register_blueprint(scan_bp)
app.register_blueprint(search_bp)
app.register_blueprint(os_scan_bp)
app.register_blueprint(payload_gen_bp)
app.register_blueprint(subnet_scan_bp)
app.register_blueprint(service_scan_bp)
app.register_blueprint(vuln_scan_bp)
app.register_blueprint(aggressive_scan_bp)
app.register_blueprint(firewall_scan_bp)
app.register_blueprint(udp_scan_bp)
app.register_blueprint(syn_scan_bp)
app.register_blueprint(traceroute_scan_bp)
app.register_blueprint(custom_scan_bp)


# nicto scan
app.register_blueprint(general_scan_bp)
app.register_blueprint(ssl_scan_bp)
app.register_blueprint(nikto_header_bp)
app.register_blueprint(nikto_outdated_bp)
app.register_blueprint(upload_scan_bp)
app.register_blueprint(admin_panel_bp)
app.register_blueprint(nickto_custom_bp)

# sploit scan
app.register_blueprint(exploits_bp)
app.register_blueprint(sploit_scanners_bp)
app.register_blueprint(post_exploit_bp)
app.register_blueprint(persistence_bp)
app.register_blueprint(msf_rpc_bp)
app.register_blueprint(payloads_bp)

if __name__ == '__main__':
    app.run(debug=True)
