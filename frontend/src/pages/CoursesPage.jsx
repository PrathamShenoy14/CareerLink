import React from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/courses';

const CoursesPage = () => {
  const categories = {
    technical: 'Technical Courses',
    management: 'Management & Leadership',
    marketing: 'Marketing & Communication',
    design: 'Design & Creative'
  };

  return (
    <Layout>
      <div className="pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover a wide range of professional courses designed to help you advance your career
            </p>
          </div>

          {/* Course Categories */}
          {Object.entries(categories).map(([key, title]) => (
            <section key={key} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="mr-3">{courses[key][0].icon}</span>
                {title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses[key].map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage; 