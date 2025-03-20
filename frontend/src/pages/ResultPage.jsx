import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

Chart.register(...registerables);

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const reportRef = useRef(null);

  if (!result) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-3xl font-bold text-gray-800">No Results Found</h2>
          <p className="text-gray-600 mt-2">
            Please complete the test to see your career recommendations.
          </p>
          <button
            onClick={() => navigate("/test")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          >
            Take the Test
          </button>
        </div>
      </Layout>
    );
  }

  const { career_recommendations, personality_profile, strengths_and_growth, ideal_environment, team_contribution } = result;

  // Prepare data for personality chart
  const personalityData = {
    labels: Object.keys(personality_profile.dimension_scores),
    datasets: [
      {
        label: "Score",
        data: Object.values(personality_profile.dimension_scores),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  // ✅ FIXED: High-quality PDF generation with full content capture
  const downloadPDF = async () => {
    try {
      const input = reportRef.current;
      if (!input) {
        console.error("Report reference not found!");
        return;
      }
  
      window.scrollTo(0, 0); // Ensure full visibility before capture
  
      const canvas = await html2canvas(input, {
        scale: 2, // Higher resolution
        useCORS: true, // Fix cross-origin images
        scrollY: -window.scrollY, // Ensure full content is captured
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // A4 width
      const pageHeight = 297; // A4 height
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let yPosition = 20;
  
      // pdf.text(userEmail, 10, 10); // Add user email at the top
      pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
      heightLeft -= pageHeight - 30;
  
      while (heightLeft > 0) {
        pdf.addPage();
        yPosition = heightLeft - imgHeight + 10;
        pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }
  
      pdf.save("CareerReport.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Layout>
      <div ref={reportRef} className="max-w-5xl mx-auto px-6 py-16 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl mt-2 font-bold text-center text-gray-900 mb-6">Your Career Personality Report</h2>

        {/* Career Recommendations */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Top Career Matches</h3>
          {career_recommendations.map((career, index) => (
            <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
              <h4 className="text-xl font-semibold text-blue-600">{career.career}</h4>
              <p className="text-gray-600 mt-1">{career.details.description}</p>
              <p className="text-gray-700 text-sm"><strong>Education:</strong> {career.details.education}</p>
              <p className="text-gray-700 text-sm"><strong>Growth:</strong> {career.details.growth}</p>
              <p className="text-gray-700 text-sm"><strong>Key Skills:</strong> {career.details.skills.join(", ")}</p>
              <p className="text-blue-600 font-semibold">Score: {career.score}</p>
            </div>
          ))}
        </section>

        {/* Personality Profile */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Personality Profile</h3>
          <p className="text-gray-700">{personality_profile.summary}</p>
          <div className="mt-6">
            <Bar data={personalityData} />
          </div>
        </section>

        {/* Strengths & Growth */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Strengths & Growth Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600">Key Strengths</h4>
              <ul className="list-disc list-inside text-gray-700">
                {strengths_and_growth.key_strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600">Growth Areas</h4>
              <ul className="list-disc list-inside text-gray-700">
                {strengths_and_growth.growth_areas.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ideal Work Environment */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ideal Work Environment</h3>
          <ul className="list-disc list-inside text-gray-700">
            {Object.entries(ideal_environment).map(([key, value], i) => (
              <li key={i}>
                <strong className="capitalize">{key.replace("_", " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        </section>

        {/* Team Contribution */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Role in a Team</h3>
          <p className="text-gray-700"><strong>Primary Role:</strong> {team_contribution.primary_role}</p>
          <ul className="list-disc list-inside text-gray-700 mt-3">
            {team_contribution.team_strengths.map((strength, i) => (
              <li key={i}>{strength}</li>
            ))}
          </ul>
        </section>

        {/* Buttons */}
        <div className="text-center mt-10 flex justify-center gap-5">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate("/test")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Retake the Test
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultsPage;
