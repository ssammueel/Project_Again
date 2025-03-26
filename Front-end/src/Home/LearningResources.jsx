import React from "react";

export const LearningResources = () => {
  const resources = [
    {
      title: "Understanding Network Vulnerabilities",
      description: "Learn how attackers exploit network weaknesses and how to protect your infrastructure",
      type: "Guide",
      link: "#"
    },
    {
      title: "Web Application Security Best Practices",
      description: "Essential techniques to secure your web applications against common attacks",
      type: "E-book",
      link: "#"
    },
    {
      title: "The Evolution of Ransomware",
      description: "How ransomware has developed and strategies to prevent attacks",
      type: "Whitepaper",
      link: "#"
    },
    {
      title: "Zero Trust Security Model",
      description: "Implementing a zero trust architecture in your organization",
      type: "Webinar",
      link: "#"
    }
  ];

  return (
    <section className="py-12 bg-gray-50 rounded-xl mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Security Knowledge Center
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expand your cybersecurity knowledge with our curated resources
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-blue-500">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-3">
                {resource.type}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <a href={resource.link} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors duration-300">
            View All Resources
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};