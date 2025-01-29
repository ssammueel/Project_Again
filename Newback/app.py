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




if __name__ == '__main__':
    app.run(debug=True)
