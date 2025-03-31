// Troubleshooting.jsx
export const Troubleshooting = () => {
    const issues = [
      {
        problem: "npm install fails with errors",
        solution: [
          "Make sure you have Node.js and npm properly installed",
          "Try clearing the npm cache: `npm cache clean --force`",
          "Delete node_modules folder and package-lock.json, then run `npm install` again",
          "If using nvm, ensure you're using the correct Node.js version"
        ]
      },
      {
        problem: "Flask backend not starting",
        solution: [
          "Ensure Python 3.8+ is installed",
          "Verify the virtual environment is activated",
          "Check all dependencies are installed: `pip install -r requirements.txt`",
          "Look for error messages in the console for specific issues"
        ]
      },
      {
        problem: "Frontend not connecting to backend",
        solution: [
          "Verify both servers are running (React on port 3000, Flask on port 5000)",
          "Check the REACT_APP_API_URL in your .env file matches your backend URL",
          "Ensure no CORS issues by checking browser console for errors",
          "If developing locally, make sure to configure Flask CORS properly"
        ]
      },
      {
        problem: "Nmap scans not working",
        solution: [
          "Ensure nmap is installed on your system and in the PATH",
          "Check if the user running the backend has permissions to execute nmap",
          "Verify the target IP is reachable from your server",
          "Check backend logs for specific error messages"
        ]
      },
      {
        problem: "Authentication issues",
        solution: [
          "Verify your database is properly set up and running",
          "Check if the user exists in the database",
          "Ensure password hashing is working correctly",
          "Verify JWT secret key is properly set in environment variables"
        ]
      },
      {
        problem: "Slow performance",
        solution: [
          "Check system resource usage (CPU, memory)",
          "For large scans, consider running them in background jobs",
          "Optimize database queries if applicable",
          "Consider scaling your deployment if consistently slow"
        ]
      }
    ];
  
    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 p-1.5 rounded-md">🔧</span>
          Troubleshooting Guide
        </h2>
        
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">{issue.problem}</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {issue.solution.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-800 p-1 rounded-md">⚠️</span>
            Getting Additional Help
          </h3>
          <p className="text-gray-700 mb-2">If you're still experiencing issues after trying these solutions:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Check the server logs for detailed error messages</li>
            <li>Search for your error message online</li>
            <li>Open an issue on our GitHub repository with details about your problem</li>
            <li>Include relevant logs, error messages, and steps to reproduce the issue</li>
          </ul>
        </div>
      </div>
    );
  };