

export const ApiReference = () => {
    const endpoints = [
      {
        method: "POST",
        path: "/api/scan/nmap",
        description: "Initiate an Nmap scan",
        parameters: [
          { name: "target", type: "string", required: true, description: "IP address or hostname to scan" },
          { name: "options", type: "string", required: false, description: "Nmap command line options" }
        ],
        example: {
          request: `{
    "target": "192.168.1.1",
    "options": "-sV -O"
  }`,
          response: `{
    "scan_id": "abc123",
    "status": "queued",
    "estimated_time": 120
  }`
        }
      },
      {
        method: "GET",
        path: "/api/scan/status/:id",
        description: "Check scan status",
        parameters: [
          { name: "id", type: "string", required: true, description: "Scan ID returned from initiation" }
        ],
        example: {
          request: "GET /api/scan/status/abc123",
          response: `{
    "scan_id": "abc123",
    "status": "running",
    "progress": 45,
    "results": null
  }`
        }
      },
      {
        method: "GET",
        path: "/api/scan/results/:id",
        description: "Get scan results",
        parameters: [
          { name: "id", type: "string", required: true, description: "Scan ID returned from initiation" }
        ],
        example: {
          request: "GET /api/scan/results/abc123",
          response: `{
    "scan_id": "abc123",
    "status": "completed",
    "results": {
      "host": "192.168.1.1",
      "ports": [
        {
          "port": 80,
          "state": "open",
          "service": "http",
          "version": "Apache 2.4.41"
        }
      ]
    }
  }`
        }
      },
      {
        method: "POST",
        path: "/api/auth/login",
        description: "Authenticate user",
        parameters: [
          { name: "username", type: "string", required: true, description: "User's username" },
          { name: "password", type: "string", required: true, description: "User's password" }
        ],
        example: {
          request: `{
    "username": "admin",
    "password": "securepassword123"
  }`,
          response: `{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "administrator"
    }
  }`
        }
      }
    ];
  
    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 p-1.5 rounded-md">📡</span>
          API Reference
        </h2>
        
        <div className="space-y-8">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                  endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="bg-gray-200/80 px-2 py-1 rounded text-sm">{endpoint.path}</code>
              </div>
              
              <p className="text-gray-700 mb-4">{endpoint.description}</p>
              
              <h4 className="font-medium text-gray-800 mb-2">Parameters</h4>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {endpoint.parameters.map((param, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{param.name}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{param.type}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{param.required ? 'Yes' : 'No'}</td>
                        <td className="px-3 py-2 text-sm text-gray-500">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Request Example</h4>
                  <pre className="bg-gray-200/80 p-2 rounded text-sm overflow-x-auto">
                    {endpoint.example.request}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Response Example</h4>
                  <pre className="bg-gray-200/80 p-2 rounded text-sm overflow-x-auto">
                    {endpoint.example.response}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };