import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { courses as coursesData } from '../data/courses';

const HomePage = () => {
  const coursesRef = useRef(null);

  // Flatten all courses from different categories into a single array
  const courses = Object.values(coursesData).flat();

  const scroll = (direction) => {
    if (coursesRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      coursesRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
    <Layout>
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
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Career Assessment</h3>
              <p className="text-gray-600">Discover your strengths and ideal career paths through our comprehensive assessment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Guided Learning</h3>
              <p className="text-gray-600">Access curated courses and resources tailored to your career goals.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
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
          <div className="relative px-12">
            {/* Left Navigation Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Course Cards Container */}
            <div 
              ref={coursesRef}
              className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {courses.map((course, index) => (
                <div key={index} className="flex-none w-72">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
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

            {/* Right Navigation Button */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
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
    </Layout>
  );
};

export default HomePage; 