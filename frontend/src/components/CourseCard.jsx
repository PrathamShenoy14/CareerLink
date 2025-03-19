import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <Link to={`/course/${course.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="text-3xl mb-4">{course.icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{course.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600">{course.provider}</span>
            <span className={`text-sm px-3 py-1 rounded-full ${difficultyColors[course.difficulty]}`}>
              {course.difficulty}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Duration: {course.duration}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard; 