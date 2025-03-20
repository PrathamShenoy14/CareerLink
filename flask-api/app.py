from flask import Flask, request, jsonify
from flask_cors import CORS
import model  # Import your AI model

app = Flask(__name__)
CORS(app)  # Allow frontend/backend communication

# Load the career assessment model
career_assessment = model.CareerAssessment()

@app.route('/predict-career', methods=['POST'])
def predict_career():
    try:
        data = request.json  # Expecting { "A": [...], "B": [...], "C": [...], "D": [...] }
        if not all(section in data for section in ['A', 'B', 'C', 'D']):
            return jsonify({'error': 'Invalid input format. Expecting sections A, B, C, D'}), 400

        # Process user responses and generate career report
        career_report = career_assessment.process_responses(data)

        return jsonify(career_report)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
