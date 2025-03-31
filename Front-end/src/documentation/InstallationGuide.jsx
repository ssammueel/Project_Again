// InstallationGuide.jsx
export const InstallationGuide = () => {
    const steps = [
      {
        title: "Clone the Repository",
        content: (
          <>
            <p className="mb-2">First, clone the repository from GitHub:</p>
            <code className="block bg-gray-200/80 p-2 rounded text-sm mb-2 overflow-x-auto">
              git clone https://github.com/yourusername/security-tools-platform.git
            </code>
            <p className="text-sm text-gray-600">Replace with your actual repository URL</p>
          </>
        )
      },
      {
        title: "Install Dependencies",
        content: (
          <>
            <p className="mb-2">Navigate to the project directory and install Node.js dependencies:</p>
            <code className="block bg-gray-200/80 p-2 rounded text-sm mb-2 overflow-x-auto">
              cd security-tools-platform<br />
              npm install
            </code>
          </>
        )
      },
      {
        title: "Set Up Python Backend",
        content: (
          <>
            <p className="mb-2">The platform requires Python 3.8+ and Flask. Set up a virtual environment:</p>
            <code className="block bg-gray-200/80 p-2 rounded text-sm mb-2 overflow-x-auto">
              python -m venv venv<br />
              source venv/bin/activate  # On Windows use `venv\Scripts\activate`<br />
              pip install -r requirements.txt
            </code>
          </>
        )
      },
      {
        title: "Configure Environment Variables",
        content: (
          <>
            <p className="mb-2">Create a <code>.env</code> file in the root directory with these variables:</p>
            <code className="block bg-gray-200/80 p-2 rounded text-sm mb-2 overflow-x-auto">
              REACT_APP_API_URL=http://localhost:5000<br />
              FLASK_ENV=development<br />
              SECRET_KEY=your-secret-key-here
            </code>
          </>
        )
      },
      {
        title: "Run the Application",
        content: (
          <>
            <p className="mb-2">Start both the React frontend and Flask backend:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Frontend (React)</h4>
                <code className="block bg-gray-200/80 p-2 rounded text-sm mb-2 overflow-x-auto">
                  npm start
                </code>
              </div>
              <div>
                <h4 className="font-medium mb-1">Backend (Flask)</h4>
                <code className="block bg-gray-200/80 p-2 rounded text-sm mb-2 overflow-x-auto">
                  flask run
                </code>
              </div>
            </div>
          </>
        )
      },
      {
        title: "Verify Installation",
        content: (
          <>
            <p className="mb-2">Open your browser and navigate to:</p>
            <code className="block bg-gray-200/80 p-2 rounded text-sm mb-2 overflow-x-auto">
              http://localhost:3000
            </code>
            <p className="text-sm text-gray-600">You should see the platform's login page if everything is working correctly.</p>
          </>
        )
      }
    ];
  
    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 p-1.5 rounded-md">🛠️</span>
          Installation Guide
        </h2>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="bg-blue-600 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <div className="ml-8">
                {step.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 p-1 rounded-md">ℹ️</span>
            System Requirements
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Node.js v16+</li>
            <li>npm v8+ or yarn</li>
            <li>Python 3.8+</li>
            <li>pip</li>
            <li>Git</li>
            <li>4GB RAM minimum</li>
            <li>2GB free disk space</li>
          </ul>
        </div>
      </div>
    );
  };