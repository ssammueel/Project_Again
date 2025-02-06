from flask import Flask
from flask_cors import CORS

from routes.register import register_bp
from routes.login import login_bp
from routes.os_scan import os_scan_bp
from routes.port_scan import scan_bp
from routes.exploit_search import search_bp
from routes.payload_generator import payload_gen_bp
from routes.service_version_scan import service_scan_bp
from routes.subnet_scan import subnet_scan_bp
from routes.vuln_scan import vuln_scan_bp
from routes.aggressive_scan import aggressive_scan_bp
from routes.firewall_evasion_scan import firewall_scan_bp
from routes.udp_scan import udp_scan_bp
from routes.syn_scan import syn_scan_bp
from routes.traceroute_scan import traceroute_scan_bp
from routes.custom_scan import custom_scan_bp

from routes.nickto_scans.general_scan import general_scan_bp
from routes.nickto_scans.ssl_scan import ssl_scan_bp
from routes.nickto_scans.nikto_header_scan import nikto_header_bp
from routes.nickto_scans.outdated_software import nikto_outdated_bp
from routes.nickto_scans.file_upload_scan import upload_scan_bp
from routes.nickto_scans.admin_panel_scan import admin_panel_bp
from routes.nickto_scans.custom_scan import nickto_custom_bp

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app) 


app.register_blueprint(register_bp, url_prefix='/api')
app.register_blueprint(login_bp, url_prefix='/api')
app.register_blueprint(scan_bp, url_prefix='/api')
app.register_blueprint(search_bp, url_prefix='/api')
app.register_blueprint(os_scan_bp,url_prefix='/api')
app.register_blueprint(payload_gen_bp,url_prefix='/api')
app.register_blueprint(subnet_scan_bp,url_prefix='/api')
app.register_blueprint(service_scan_bp,url_prefix='/api')
app.register_blueprint(vuln_scan_bp,url_prefix='/api')
app.register_blueprint(aggressive_scan_bp,url_prefix='/api')
app.register_blueprint(firewall_scan_bp,url_prefix='/api')
app.register_blueprint(udp_scan_bp,url_prefix='/api')
app.register_blueprint(syn_scan_bp,url_prefix='/api')
app.register_blueprint(traceroute_scan_bp,url_prefix='/api')
app.register_blueprint(custom_scan_bp,url_prefix='/api')


# nicto scan
app.register_blueprint(general_scan_bp)
app.register_blueprint(ssl_scan_bp)
app.register_blueprint(nikto_header_bp)
app.register_blueprint(nikto_outdated_bp)
app.register_blueprint(upload_scan_bp)
app.register_blueprint(admin_panel_bp)
app.register_blueprint(nickto_custom_bp)

if __name__ == '__main__':
    app.run(debug=True)
