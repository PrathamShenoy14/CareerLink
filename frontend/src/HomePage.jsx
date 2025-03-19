import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const courses = [
    {
        name: "Career Development Fundamentals",
        provider: "CareerLink Academy",
        description: "Master the basics of career planning and development",
        difficulty: "Beginner",
        icon: "📚"
    },
    {
        name: "Professional Resume Writing",
        provider: "Resume Experts",
        description: "Learn to craft compelling resumes that get noticed",
        difficulty: "Intermediate",
        icon: "📝"
    },
    {
        name: "Interview Mastery",
        provider: "CareerLink Pro",
        description: "Ace your interviews with confidence",
        difficulty: "Advanced",
        icon: "🎯"
    },
    {
        name: "LinkedIn Networking Strategies",
        provider: "SocialPro Academy",
        description: "Optimize your LinkedIn profile and build strong connections",
        difficulty: "Beginner",
        icon: "🔗"
    },
    {
        name: "Effective Cover Letter Writing",
        provider: "Resume Experts",
        description: "Write persuasive cover letters that stand out",
        difficulty: "Intermediate",
        icon: "✉️"
    },
    {
        name: "Salary Negotiation Tactics",
        provider: "Career Growth Hub",
        description: "Learn to negotiate your salary with confidence",
        difficulty: "Advanced",
        icon: "💰"
    },
    {
        name: "Personal Branding for Job Seekers",
        provider: "Brand Yourself Academy",
        description: "Build a strong personal brand to attract opportunities",
        difficulty: "Intermediate",
        icon: "🌟"
    },
    {
        name: "Time Management for Professionals",
        provider: "Productivity Experts",
        description: "Enhance productivity and manage time effectively",
        difficulty: "Beginner",
        icon: "⏳"
    },
    {
        name: "Networking for Career Success",
        provider: "CareerLink Pro",
        description: "Develop networking skills to unlock career growth",
        difficulty: "Intermediate",
        icon: "🤝"
    },
    {
        name: "Public Speaking & Communication Skills",
        provider: "Speaking Academy",
        description: "Overcome fear and become a confident speaker",
        difficulty: "Advanced",
        icon: "🎤"
    },
    {
        name: "Workplace Conflict Resolution",
        provider: "HR Insights",
        description: "Learn strategies to handle workplace conflicts effectively",
        difficulty: "Intermediate",
        icon: "⚖️"
    },
    {
        name: "Job Search Strategies",
        provider: "Career Growth Hub",
        description: "Discover modern job search techniques",
        difficulty: "Beginner",
        icon: "🔍"
    },
    {
        name: "Freelancing & Gig Economy Mastery",
        provider: "Freelance Pros",
        description: "Start and grow your freelance career successfully",
        difficulty: "Advanced",
        icon: "💼"
    },
    {
        name: "Emotional Intelligence at Work",
        provider: "Mindful Careers",
        description: "Develop emotional intelligence to excel in the workplace",
        difficulty: "Intermediate",
        icon: "🧠"
    },
    {
        name: "Leadership & Team Management",
        provider: "Leadership Academy",
        description: "Become a great leader and manage teams effectively",
        difficulty: "Advanced",
        icon: "🚀"
    }
  ];


  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      quote: "CareerLink helped me transition into tech seamlessly. The guidance was invaluable!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      quote: "The career assessment tools were spot-on! Found my dream job through CareerLink.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Healthcare Professional",
      quote: "The personalized roadmap made all the difference in my career journey.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">CareerLink</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/test" className="text-gray-700 hover:text-blue-600">Test</Link>
              <Link to="/course" className="text-gray-700 hover:text-blue-600">Course</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link to="/login" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Perfect Career Path
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take our scientifically proven personality assessment to unlock your true potential and find your ideal career match.
            </p>
            <Link
              to="/test"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take Career Test Now
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Career Assessment</h3>
              <p className="text-gray-600">Discover your strengths and ideal career paths through our comprehensive assessment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Guided Learning</h3>
              <p className="text-gray-600">Access curated courses and resources tailored to your career goals.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Get guidance from industry professionals and career counselors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Carousel Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4">
              {courses.map((course, index) => (
                <div key={index} className="flex-none w-72">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-4">{course.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-600">{course.provider}</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {course.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {"⭐".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CareerLink</h3>
              <p className="text-gray-400">Empowering careers through personalized guidance and continuous learning.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@careerlink.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Career Street</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CareerLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;