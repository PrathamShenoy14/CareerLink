import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

class CareerPersonalityModel:
    def __init__(self):
        # Initialize the career database
        self.careers = self._initialize_career_database()
        
        # Define personality dimensions and their related question indices
        self.dimensions = {
            'Extraversion': {
                'questions': [
                    {'section': 'A', 'index': 5, 'weight': 1},  # Energized by interacting with people
                    {'section': 'A', 'index': 0, 'weight': -1}, # Prefer working independently (negative)
                    {'section': 'A', 'index': 12, 'weight': 1}, # Enjoy persuading others
                    {'section': 'D', 'index': 8, 'weight': 1},  # Prefer environments with social interaction
                ],
                'range': [0, 10]
            },
            'Analytical': {
                'questions': [
                    {'section': 'A', 'index': 6, 'weight': 1},  # Enjoy analyzing data
                    {'section': 'A', 'index': 1, 'weight': 1},  # Enjoy theoretical problems
                    {'section': 'C', 'index': 0, 'weight': 1},  # Analyzing complex information
                    {'section': 'C', 'index': 13, 'weight': 1}, # Thinking critically and logically
                ],
                'range': [0, 10]
            },
            'Structure': {
                'questions': [
                    {'section': 'A', 'index': 2, 'weight': 1},  # Like structured schedule
                    {'section': 'A', 'index': 7, 'weight': 1},  # Prefer established procedures
                    {'section': 'A', 'index': 10, 'weight': 1}, # Prefer calm and orderly environments
                    {'section': 'D', 'index': 9, 'weight': 1},  # Prefer clear policies and procedures
                ],
                'range': [0, 10]
            },
            'Leadership': {
                'questions': [
                    {'section': 'A', 'index': 3, 'weight': 1},  # Comfortable making decisions
                    {'section': 'A', 'index': 19, 'weight': 1}, # Enjoy leadership position
                    {'section': 'C', 'index': 8, 'weight': 1},  # Leading and inspiring others
                    {'section': 'B', 'index': 6, 'weight': 1},  # Having influence over decisions
                ],
                'range': [0, 10]
            },
            'Innovation': {
                'questions': [
                    {'section': 'A', 'index': 14, 'weight': 1}, # Value creativity and innovation
                    {'section': 'A', 'index': 9, 'weight': 1},  # Enjoy taking risks
                    {'section': 'A', 'index': 17, 'weight': 1}, # Comfortable with ambiguity
                    {'section': 'C', 'index': 5, 'weight': 1},  # Being creative and innovative
                ],
                'range': [0, 10]
            },
            'Social': {
                'questions': [
                    {'section': 'A', 'index': 8, 'weight': 1},  # Motivated by helping others
                    {'section': 'B', 'index': 4, 'weight': 1},  # Building close relationships
                    {'section': 'C', 'index': 14, 'weight': 1}, # Understanding others' perspectives
                    {'section': 'B', 'index': 1, 'weight': 1},  # Making positive impact on society
                ],
                'range': [0, 10]
            },
            'Practical': {
                'questions': [
                    {'section': 'A', 'index': 13, 'weight': 1}, # Prefer concrete results
                    {'section': 'A', 'index': 18, 'weight': -1}, # Prefer working with ideas (negative)
                    {'section': 'C', 'index': 3, 'weight': 1},  # Solving technical problems
                    {'section': 'B', 'index': 0, 'weight': 1},  # Financial security and stability
                ],
                'range': [0, 10]
            },
            'Teamwork': {
                'questions': [
                    {'section': 'D', 'index': 5, 'weight': 1},  # Work best in collaborative settings
                    {'section': 'B', 'index': 11, 'weight': 1}, # Working in supportive environment
                    {'section': 'C', 'index': 10, 'weight': 1}, # Working effectively in teams
                    {'section': 'A', 'index': 0, 'weight': -1}, # Prefer working independently (negative)
                ],
                'range': [0, 10]
            }
        }
        
    def _initialize_career_database(self):
        """Initialize the career database with traits and requirements"""
        return {
            'Software Developer': {
                'Extraversion': 3, 'Analytical': 9, 'Structure': 5, 'Leadership': 4,
                'Innovation': 7, 'Social': 4, 'Practical': 8, 'Teamwork': 6,
                'description': 'Designs and builds computer programs and applications',
                'skills': ['Programming', 'Problem-solving', 'Logical thinking'],
                'education': 'Bachelor\'s in Computer Science or related field',
                'growth': 'High demand with opportunities for specialization and advancement'
            },
            'Marketing Manager': {
                'Extraversion': 8, 'Analytical': 6, 'Structure': 6, 'Leadership': 8,
                'Innovation': 8, 'Social': 7, 'Practical': 5, 'Teamwork': 7,
                'description': 'Develops and implements marketing strategies to promote products or services',
                'skills': ['Communication', 'Creativity', 'Strategic thinking'],
                'education': 'Bachelor\'s in Marketing, Business, or related field',
                'growth': 'Good growth potential with opportunities in digital marketing'
            },
            'Accountant': {
                'Extraversion': 4, 'Analytical': 8, 'Structure': 9, 'Leadership': 5,
                'Innovation': 3, 'Social': 4, 'Practical': 9, 'Teamwork': 5,
                'description': 'Prepares and examines financial records and ensures accuracy',
                'skills': ['Attention to detail', 'Numerical skills', 'Organization'],
                'education': 'Bachelor\'s in Accounting or Finance',
                'growth': 'Stable career with opportunities for specialization'
            },
            'Human Resources Manager': {
                'Extraversion': 7, 'Analytical': 6, 'Structure': 7, 'Leadership': 7,
                'Innovation': 5, 'Social': 9, 'Practical': 6, 'Teamwork': 8,
                'description': 'Oversees the administrative functions of an organization',
                'skills': ['Communication', 'Interpersonal skills', 'Problem-solving'],
                'education': 'Bachelor\'s in Human Resources, Business, or related field',
                'growth': 'Good growth potential with increasing importance in organizations'
            },
            'Graphic Designer': {
                'Extraversion': 5, 'Analytical': 5, 'Structure': 4, 'Leadership': 3,
                'Innovation': 9, 'Social': 6, 'Practical': 7, 'Teamwork': 5,
                'description': 'Creates visual concepts to communicate ideas',
                'skills': ['Creativity', 'Technical skills', 'Communication'],
                'education': 'Bachelor\'s in Graphic Design or related field',
                'growth': 'Growing field with opportunities in digital media'
            },
            'Project Manager': {
                'Extraversion': 7, 'Analytical': 7, 'Structure': 8, 'Leadership': 9,
                'Innovation': 6, 'Social': 7, 'Practical': 8, 'Teamwork': 9,
                'description': 'Plans, executes, and closes projects',
                'skills': ['Organization', 'Leadership', 'Problem-solving'],
                'education': 'Bachelor\'s degree with project management certification',
                'growth': 'High demand across industries with good advancement opportunities'
            },
            'Teacher': {
                'Extraversion': 7, 'Analytical': 6, 'Structure': 7, 'Leadership': 6,
                'Innovation': 7, 'Social': 9, 'Practical': 5, 'Teamwork': 6,
                'description': 'Educates students and helps them develop knowledge and skills',
                'skills': ['Communication', 'Patience', 'Creativity'],
                'education': 'Bachelor\'s degree with teaching certification',
                'growth': 'Stable career with opportunities for specialization'
            },
            'Financial Analyst': {
                'Extraversion': 4, 'Analytical': 9, 'Structure': 8, 'Leadership': 5,
                'Innovation': 5, 'Social': 3, 'Practical': 8, 'Teamwork': 5,
                'description': 'Assesses the performance of investments and provides recommendations',
                'skills': ['Analytical thinking', 'Mathematics', 'Research'],
                'education': 'Bachelor\'s in Finance, Economics, or related field',
                'growth': 'Good growth potential with opportunities for advancement'
            },
            'Nurse': {
                'Extraversion': 7, 'Analytical': 6, 'Structure': 7, 'Leadership': 6,
                'Innovation': 4, 'Social': 9, 'Practical': 9, 'Teamwork': 8,
                'description': 'Provides patient care and support in healthcare settings',
                'skills': ['Empathy', 'Technical skills', 'Communication'],
                'education': 'Bachelor\'s in Nursing with certification',
                'growth': 'High demand with various specialization opportunities'
            },
            'Sales Representative': {
                'Extraversion': 9, 'Analytical': 5, 'Structure': 5, 'Leadership': 7,
                'Innovation': 6, 'Social': 8, 'Practical': 7, 'Teamwork': 6,
                'description': 'Sells products or services to customers',
                'skills': ['Communication', 'Persuasion', 'Relationship building'],
                'education': 'Bachelor\'s degree preferred but not always required',
                'growth': 'Good earning potential with performance-based compensation'
            },
            'Data Scientist': {
                'Extraversion': 3, 'Analytical': 10, 'Structure': 6, 'Leadership': 5,
                'Innovation': 7, 'Social': 4, 'Practical': 7, 'Teamwork': 5,
                'description': 'Analyzes data to find patterns and insights',
                'skills': ['Programming', 'Statistics', 'Problem-solving'],
                'education': 'Master\'s or PhD in Data Science, Computer Science, or related field',
                'growth': 'High demand with excellent growth opportunities'
            },
            'Psychologist': {
                'Extraversion': 6, 'Analytical': 8, 'Structure': 6, 'Leadership': 5,
                'Innovation': 6, 'Social': 10, 'Practical': 5, 'Teamwork': 5,
                'description': 'Studies human behavior and provides mental health services',
                'skills': ['Empathy', 'Analytical thinking', 'Communication'],
                'education': 'Doctorate in Psychology with licensing',
                'growth': 'Growing field with various specialization opportunities'
            },
            'UX Designer': {
                'Extraversion': 6, 'Analytical': 7, 'Structure': 5, 'Leadership': 5,
                'Innovation': 9, 'Social': 8, 'Practical': 7, 'Teamwork': 7,
                'description': 'Designs user experiences for products and services',
                'skills': ['Design thinking', 'Empathy', 'Technical skills'],
                'education': 'Bachelor\'s in Design, HCI, or related field',
                'growth': 'Growing field with opportunities in tech and product development'
            },
            'Environmental Scientist': {
                'Extraversion': 4, 'Analytical': 8, 'Structure': 7, 'Leadership': 5,
                'Innovation': 6, 'Social': 7, 'Practical': 8, 'Teamwork': 6,
                'description': 'Studies environmental issues and develops solutions',
                'skills': ['Scientific knowledge', 'Research', 'Problem-solving'],
                'education': 'Bachelor\'s or Master\'s in Environmental Science or related field',
                'growth': 'Growing field with opportunities in sustainability'
            },
            'Entrepreneur': {
                'Extraversion': 7, 'Analytical': 7, 'Structure': 4, 'Leadership': 9,
                'Innovation': 9, 'Social': 7, 'Practical': 8, 'Teamwork': 6,
                'description': 'Starts and runs businesses',
                'skills': ['Risk-taking', 'Creativity', 'Resilience'],
                'education': 'Varies widely, often includes business education',
                'growth': 'Unlimited potential with high risk and reward'
            }
        }
    
    def process_answers(self, answers):
        """
        Process the user's answers and calculate dimension scores
        
        Args:
            answers: Dictionary with sections A, B, C, D containing lists of answers (1-5)
            
        Returns:
            Dictionary with dimension scores and career recommendations
        """
        # Calculate raw dimension scores
        dimension_scores = {}
        for dimension, info in self.dimensions.items():
            score = 0
            for q in info['questions']:
                section = q['section']
                index = q['index']
                weight = q['weight']
                
                # Adjust score based on answer and weight
                if section in answers and index < len(answers[section]):
                    score += (answers[section][index] - 1) * weight
                
            # Normalize to dimension range
            min_val, max_val = info['range']
            score = min_val + (score / (4 * len(info['questions']))) * (max_val - min_val)
            dimension_scores[dimension] = round(score, 1)
        
        # Find career matches
        career_matches = self._find_career_matches(dimension_scores)
        
        # Generate full report
        report = self._generate_report(dimension_scores, career_matches, answers)
        
        return report
    
    def _find_career_matches(self, dimension_scores, num_matches=5):
        """Find the best career matches based on dimension scores"""
        matches = []
        
        for career, attributes in self.careers.items():
            # Calculate match score (Euclidean distance)
            match_score = 0
            for dimension, score in dimension_scores.items():
                if dimension in attributes:
                    # Lower difference means better match
                    match_score += (score - attributes[dimension]) ** 2
            
            match_score = 1 / (1 + np.sqrt(match_score))  # Convert to similarity score
            matches.append({
                'career': career,
                'score': round(match_score * 100, 1),
                'details': attributes
            })
        
        # Sort by match score (descending)
        matches.sort(key=lambda x: x['score'], reverse=True)
        
        return matches[:num_matches]
    
    def _generate_report(self, dimension_scores, career_matches, answers):
        """Generate a comprehensive report based on assessment results"""
        # Calculate work style based on dimension scores
        work_style = self._calculate_work_style(dimension_scores)
        
        # Calculate values and motivators
        values = self._calculate_values(answers)
        
        # Calculate strengths and growth areas
        strengths = self._calculate_strengths(answers)
        
        # Calculate ideal environment
        environment = self._calculate_environment(dimension_scores, answers)
        
        # Assemble full report
        report = {
            'personality_profile': {
                'dimension_scores': dimension_scores,
                'summary': self._generate_profile_summary(dimension_scores)
            },
            'work_style': work_style,
            'values_and_motivators': values,
            'strengths_and_growth': strengths,
            'ideal_environment': environment,
            'career_recommendations': career_matches,
            'development_recommendations': self._generate_development_recommendations(dimension_scores, strengths),
            'team_contribution': self._generate_team_contribution(dimension_scores)
        }
        
        return report
    
    def _generate_profile_summary(self, dimension_scores):
        """Generate a summary of the personality profile"""
        # Determine top 3 dimensions
        top_dimensions = sorted(dimension_scores.items(), key=lambda x: x[1], reverse=True)[:3]
        
        summary = "Your personality profile shows you are particularly strong in "
        summary += ", ".join([f"{dim} ({score})" for dim, score in top_dimensions])
        summary += ". This combination suggests you might excel in roles that require "
        
        # Add specific strengths based on top dimensions
        traits = {
            'Extraversion': "interpersonal communication and engagement with others",
            'Analytical': "logical thinking and data analysis",
            'Structure': "organization and systematic approaches",
            'Leadership': "guiding others and taking initiative",
            'Innovation': "creativity and bringing new ideas to the table",
            'Social': "supporting and understanding others",
            'Practical': "hands-on problem solving and implementation",
            'Teamwork': "collaboration and group dynamics"
        }
        
        summary += ", ".join([traits[dim] for dim, _ in top_dimensions]) + "."
        
        return summary
    
    def _calculate_work_style(self, dimension_scores):
        """Calculate work style based on dimension scores"""
        work_style = {
            'decision_making': self._calculate_decision_style(dimension_scores),
            'problem_solving': self._calculate_problem_solving_style(dimension_scores),
            'communication': self._calculate_communication_style(dimension_scores),
            'collaboration': self._calculate_collaboration_style(dimension_scores),
            'leadership': self._calculate_leadership_style(dimension_scores),
            'time_management': self._calculate_time_management_style(dimension_scores)
        }
        
        return work_style
    
    def _calculate_decision_style(self, scores):
        """Calculate decision-making style"""
        if scores['Analytical'] > 7 and scores['Structure'] > 7:
            return "Methodical and data-driven decision maker who carefully analyzes options before proceeding"
        elif scores['Analytical'] > 7 and scores['Innovation'] > 7:
            return "Strategic thinker who combines analytical insight with innovative possibilities"
        elif scores['Social'] > 7 and scores['Teamwork'] > 7:
            return "Collaborative decision maker who considers the impact on people and seeks input from others"
        elif scores['Leadership'] > 7 and scores['Practical'] > 7:
            return "Decisive and action-oriented, making practical decisions efficiently"
        else:
            return "Balanced decision maker who adapts approach based on the situation"
    
    def _calculate_problem_solving_style(self, scores):
        """Calculate problem-solving style"""
        if scores['Analytical'] > 7 and scores['Innovation'] > 7:
            return "Creative problem solver who combines analytical thinking with innovative approaches"
        elif scores['Analytical'] > 7 and scores['Practical'] > 7:
            return "Systematic problem solver who breaks down complex issues into manageable components"
        elif scores['Social'] > 7 and scores['Teamwork'] > 7:
            return "Collaborative problem solver who leverages diverse perspectives"
        elif scores['Leadership'] > 7 and scores['Innovation'] > 7:
            return "Visionary problem solver who leads others toward innovative solutions"
        else:
            return "Adaptable problem solver who uses multiple approaches based on the situation"
    
    def _calculate_communication_style(self, scores):
        """Calculate communication style"""
        if scores['Extraversion'] > 7 and scores['Social'] > 7:
            return "Warm and engaging communicator who builds rapport easily"
        elif scores['Analytical'] > 7 and scores['Structure'] > 7:
            return "Clear and precise communicator who focuses on accuracy and logic"
        elif scores['Leadership'] > 7 and scores['Extraversion'] > 7:
            return "Confident and persuasive communicator who inspires others"
        elif scores['Innovation'] > 7 and scores['Social'] > 7:
            return "Expressive and creative communicator who connects ideas with people"
        else:
            return "Balanced communicator who adapts style based on audience and context"
    
    def _calculate_collaboration_style(self, scores):
        """Calculate collaboration style"""
        if scores['Teamwork'] > 7 and scores['Social'] > 7:
            return "Supportive team player who values harmony and positive relationships"
        elif scores['Leadership'] > 7 and scores['Teamwork'] > 7:
            return "Team facilitator who helps guide collaborative efforts"
        elif scores['Analytical'] > 7 and scores['Teamwork'] > 7:
            return "Methodical collaborator who contributes thoughtful analysis to team efforts"
        elif scores['Innovation'] > 7 and scores['Teamwork'] > 7:
            return "Creative collaborator who brings new ideas to group projects"
        else:
            return "Adaptable collaborator who adjusts approach based on team dynamics"
    
    def _calculate_leadership_style(self, scores):
        """Calculate leadership style"""
        if scores['Leadership'] > 7 and scores['Social'] > 7:
            return "Empathetic leader who focuses on developing and supporting team members"
        elif scores['Leadership'] > 7 and scores['Structure'] > 7:
            return "Organized leader who provides clear direction and structure"
        elif scores['Leadership'] > 7 and scores['Innovation'] > 7:
            return "Visionary leader who inspires innovation and change"
        elif scores['Leadership'] > 7 and scores['Analytical'] > 7:
            return "Strategic leader who bases decisions on thorough analysis"
        else:
            return "Balanced leader who adapts style based on situation and team needs"
    
    def _calculate_time_management_style(self, scores):
        """Calculate time management style"""
        if scores['Structure'] > 7 and scores['Practical'] > 7:
            return "Highly organized with structured approaches to managing time and tasks"
        elif scores['Innovation'] > 7 and scores['Practical'] < 5:
            return "Flexible time manager who adapts to changing priorities and opportunities"
        elif scores['Analytical'] > 7 and scores['Structure'] > 7:
            return "Methodical planner who creates detailed schedules and systems"
        elif scores['Leadership'] > 7 and scores['Structure'] > 5:
            return "Strategic time manager who focuses on high-impact activities"
        else:
            return "Balanced time manager who combines structure with flexibility"
    
    def _calculate_values(self, answers):
        """Calculate values and motivators based on answers"""
        # Extract values from Section B
        values_scores = {}
        value_mapping = {
            0: "Financial Security",
            1: "Social Impact",
            2: "Recognition",
            3: "Autonomy",
            4: "Relationships",
            5: "Learning",
            6: "Influence",
            7: "Work-Life Balance",
            8: "Innovation",
            9: "Purpose",
            10: "Advancement",
            11: "Collaboration",
            12: "Structure",
            13: "Creativity",
            14: "Job Security"
        }
        
        for i, score in enumerate(answers['B']):
            if i in value_mapping:
                values_scores[value_mapping[i]] = score
        
        # Find top 3 values
        top_values = sorted(values_scores.items(), key=lambda x: x[1], reverse=True)[:3]
        
        # Find bottom 2 values
        bottom_values = sorted(values_scores.items(), key=lambda x: x[1])[:2]
        
        return {
            'primary_motivators': [value for value, _ in top_values],
            'secondary_motivators': [key for key, value in values_scores.items() 
                                    if value >= 4 and key not in [v for v, _ in top_values]],
            'less_important': [value for value, _ in bottom_values],
            'motivator_summary': f"You are primarily motivated by {', '.join([v for v, _ in top_values])}. "
                                f"These values should be central to your career choices."
        }
    
    def _calculate_strengths(self, answers):
        """Calculate strengths and growth areas based on answers"""
        # Extract strengths from Section C
        strength_mapping = {
            0: "Analytical Thinking",
            1: "Communication",
            2: "Organization",
            3: "Technical Problem-Solving",
            4: "Relationship Building",
            5: "Creativity",
            6: "Decision Making",
            7: "Attention to Detail",
            8: "Leadership",
            9: "Adaptability",
            10: "Teamwork",
            11: "Conflict Resolution",
            12: "Planning",
            13: "Critical Thinking",
            14: "Empathy"
        }
        
        strength_scores = {}
        for i, score in enumerate(answers['C']):
            if i in strength_mapping:
                strength_scores[strength_mapping[i]] = score
        
        # Find top strengths
        top_strengths = sorted(strength_scores.items(), key=lambda x: x[1], reverse=True)[:4]
        
        # Find growth areas
        growth_areas = sorted(strength_scores.items(), key=lambda x: x[1])[:3]
        
        return {
            'key_strengths': [strength for strength, _ in top_strengths],
            'growth_areas': [strength for strength, _ in growth_areas],
            'strengths_summary': f"Your standout strengths include {', '.join([s for s, _ in top_strengths])}. "
                                f"Consider roles that allow you to leverage these abilities."
        }
    
    def _calculate_environment(self, dimension_scores, answers):
        """Calculate ideal work environment"""
        # Extract environment preferences from Section D
        env_mapping = {
            0: "Pace",
            1: "Workspace",
            2: "Innovation Culture",
            3: "Schedule",
            4: "Competition",
            5: "Collaboration",
            6: "Hierarchy",
            7: "Remote Work",
            8: "Social Interaction",
            9: "Structure"
        }
        
        env_preferences = {}
        for i, score in enumerate(answers['D']):
            if i in env_mapping:
                env_preferences[env_mapping[i]] = score
        
        # Determine environment characteristics
        environment = {}
        
        # Pace
        if env_preferences["Pace"] >= 4:
            environment["pace"] = "Fast-paced environment with variety and new challenges"
        else:
            environment["pace"] = "Steady-paced environment allowing for focus and depth"
        
        # Physical setup
        if env_preferences["Workspace"] >= 4:
            environment["physical_setup"] = "Private workspace that allows for concentration"
        else:
            environment["physical_setup"] = "Open, collaborative workspace that facilitates interaction"
        
        # Management style
        if dimension_scores["Leadership"] > 7:
            environment["management_style"] = "Hands-off management that provides autonomy and trust"
        elif dimension_scores["Structure"] > 7:
            environment["management_style"] = "Clear direction with regular feedback and structure"
        else:
            environment["management_style"] = "Balanced management with guidance and some autonomy"
        
        # Team dynamics
        if env_preferences["Collaboration"] >= 4:
            environment["team_dynamics"] = "Collaborative team with shared goals and support"
        elif env_preferences["Competition"] >= 4:
            environment["team_dynamics"] = "Achievement-oriented team that values results and excellence"
        else:
            environment["team_dynamics"] = "Independent work with opportunities for collaboration"
        
        # Organizational culture
        culture_aspects = []
        if env_preferences["Innovation Culture"] >= 4:
            culture_aspects.append("innovative")
        if env_preferences["Structure"] >= 4:
            culture_aspects.append("structured")
        if env_preferences["Social Interaction"] >= 4:
            culture_aspects.append("social")
        if not culture_aspects:
            culture_aspects = ["balanced"]
        
        environment["organizational_culture"] = f"A {' and '.join(culture_aspects)} culture that values "
        
        if "innovative" in culture_aspects:
            environment["organizational_culture"] += "creativity and new ideas"
        elif "structured" in culture_aspects:
            environment["organizational_culture"] += "consistency and clear processes"
        elif "social" in culture_aspects:
            environment["organizational_culture"] += "relationships and teamwork"
        else:
            environment["organizational_culture"] += "a mix of structure and flexibility"
        
        # Work-life balance
        if env_preferences["Schedule"] >= 4:
            environment["work_arrangement"] = "Consistent schedule with clear boundaries"
        else:
            environment["work_arrangement"] = "Flexible schedule that adapts to changing needs"
        
        if env_preferences["Remote Work"] >= 4:
            environment["work_arrangement"] += " with remote work options"
        
        return environment
    
    def _generate_development_recommendations(self, dimension_scores, strengths):
        """Generate development recommendations based on profile"""
        recommendations = []
        
        # Recommendations based on lower dimension scores
        low_dimensions = [dim for dim, score in dimension_scores.items() if score < 5]
        for dim in low_dimensions:
            if dim == "Extraversion":
                recommendations.append("Consider practicing public speaking or small group presentations to build confidence in social situations")
            elif dim == "Analytical":
                recommendations.append("Develop stronger analytical skills through online courses in data analysis or critical thinking")
            elif dim == "Structure":
                recommendations.append("Implement productivity systems to improve organization and time management")
            elif dim == "Leadership":
                recommendations.append("Seek opportunities to lead small projects or teams to build leadership experience")
            elif dim == "Innovation":
                recommendations.append("Cultivate creative thinking by exposing yourself to new ideas and perspectives")
            elif dim == "Social":
                recommendations.append("Develop emotional intelligence through reading and practical exercises")
            elif dim == "Practical":
                recommendations.append("Focus on translating ideas into actionable plans and concrete results")
            elif dim == "Teamwork":
                recommendations.append("Build collaboration skills by volunteering for cross-functional projects")
        
        # Recommendations based on growth areas
        for area in strengths['growth_areas']:
            if area == "Analytical Thinking":
                recommendations.append("Take courses in logic, data analysis, or critical thinking")
            elif area == "Communication":
                recommendations.append("Practice writing and speaking in different contexts to build versatility")
            elif area == "Organization":
                recommendations.append("Implement a personal organization system that works with your natural style")
            elif area == "Technical Problem-Solving":
                recommendations.append("Take on technical challenges that push your limits incrementally")
            elif area == "Relationship Building":
                recommendations.append("Practice active listening and empathy in professional interactions")
            elif area == "Creativity":
                recommendations.append("Regularly engage in creative exercises or hobbies")
            elif area == "Decision Making":
                recommendations.append("Create a decision-making framework to guide your process")
            elif area == "Attention to Detail":
                recommendations.append("Develop review processes and checklists for important work")
            elif area == "Leadership":
                recommendations.append("Seek mentorship from leaders you admire and practice leadership skills")
            elif area == "Adaptability":
                recommendations.append("Deliberately put yourself in new situations that require flexibility")
            elif area == "Teamwork":
                recommendations.append("Focus on understanding team dynamics and your role within them")
            elif area == "Conflict Resolution":
                recommendations.append("Learn techniques for constructive conflict management")
            elif area == "Planning":
                recommendations.append("Practice breaking large goals into actionable steps with timelines")
            elif area == "Critical Thinking":
                recommendations.append("Challenge assumptions and practice evaluating information from multiple perspectives")
            elif area == "Empathy":
                recommendations.append("Practice seeing situations from others' perspectives and validating their experiences")
        
        # Add career-specific recommendations based on top career matches
        # (This would be implemented with specific recommendations for each career path)
        
        return recommendations[:5]  # Return top 5 recommendations
    
    def _generate_team_contribution(self, dimension_scores):
        """Generate insights about how the person contributes to teams"""
        contribution = {}
        
        # Determine primary team role
        if dimension_scores['Leadership'] > 7:
            contribution['primary_role'] = "Leader who provides direction and motivation"
        elif dimension_scores['Analytical'] > 7:
            contribution['primary_role'] = "Analyzer who evaluates options and provides insights"
        elif dimension_scores['Innovation'] > 7:
            contribution['primary_role'] = "Innovator who generates new ideas and approaches"
        elif dimension_scores['Social'] > 7:
            contribution['primary_role'] = "Harmonizer who builds relationships and resolves conflicts"
        elif dimension_scores['Practical'] > 7:
            contribution['primary_role'] = "Implementer who turns ideas into action"
        elif dimension_scores['Structure'] > 7:
            contribution['primary_role'] = "Organizer who creates systems and ensures follow-through"
        else:
            contribution['primary_role'] = "Flexible contributor who adapts to team needs"
        
        # Determine strengths and challenges in team settings
        strengths = []
        challenges = []
        
        if dimension_scores['Teamwork'] > 7:
            strengths.append("Building consensus and collaborative solutions")
        elif dimension_scores['Teamwork'] < 4:
            challenges.append("May prefer independent work over extensive collaboration")
        
        if dimension_scores['Social'] > 7:
            strengths.append("Creating positive team dynamics and relationships")
        elif dimension_scores['Social'] < 4:
            challenges.append("May focus more on tasks than relationships")
        
        if dimension_scores['Leadership'] > 7:
            strengths.append("Taking initiative and guiding team direction")
        elif dimension_scores['Leadership'] < 4:
            challenges.append("May hesitate to assert ideas in group settings")
        
        if dimension_scores['Innovation'] > 7:
            strengths.append("Bringing creativity and fresh perspectives")
        elif dimension_scores['Innovation'] < 4:
            challenges.append("May prefer established methods over innovation")
        
        if dimension_scores['Structure'] > 7:
            strengths.append("Ensuring organization and follow-through")
        elif dimension_scores['Structure'] < 4:
            challenges.append("May resist rigid processes or schedules")
        
        contribution['team_strengths'] = strengths[:3]  # Top 3 strengths
        contribution['team_challenges'] = challenges[:2]  # Top 2 challenges
        
        # Generate communication tips
        communication_tips = []
        
        if dimension_scores['Extraversion'] > 7:
            communication_tips.append("Remember to create space for quieter team members to contribute")
        elif dimension_scores['Extraversion'] < 4:
            communication_tips.append("Consider sharing your thoughts more frequently in group settings")
        
        if dimension_scores['Analytical'] > 7:
            communication_tips.append("Balance detailed analysis with bottom-line insights")
        
        if dimension_scores['Social'] < 5:
            communication_tips.append("Take time to build relationships beyond task-focused interactions")
        
        contribution['communication_tips'] = communication_tips[:3]  # Top 3 tips
        
        return contribution


class CareerAssessment:
    def __init__(self):
        self.model = CareerPersonalityModel()
        self.questions = self._initialize_questions()
        
    def _initialize_questions(self):
        """Initialize the assessment questions"""
        questions = {
            'A': [  # Work Preferences
                "I prefer working independently rather than in a team.",
                "I enjoy solving theoretical problems.",
                "I like having a structured schedule and clear expectations.",
                "I am comfortable making important decisions.",
                "I prefer concrete facts over abstract theories.",
                "I feel energized after interacting with many people.",
                "I enjoy analyzing data and finding patterns.",
                "I prefer following established procedures rather than creating new ones.",
                "I am motivated by opportunities to help others.",
                "I enjoy taking risks and trying new approaches.",
                "I prefer calm and orderly environments.",
                "I value practical skills over theoretical knowledge.",
                "I enjoy persuading others to see my point of view.",
                "I prefer tasks with concrete, visible results.",
                "I value creativity and innovation in my work.",
                "I am comfortable with frequent changes and new challenges.",
                "I prefer working with people rather than with information or things.",
                "I am comfortable with ambiguity and uncertainty.",
                "I prefer working with ideas rather than with concrete objects.",
                "I would enjoy being in a leadership position."
            ],
            'B': [  # Values and Motivators
                "Financial security and stability",
                "Making a positive impact on society",
                "Recognition and prestige",
                "Independence and autonomy",
                "Building close relationships with colleagues",
                "Continuous learning and growth",
                "Having influence over important decisions",
                "Work-life balance",
                "Contributing to innovation and progress",
                "Finding meaning and purpose in work",
                "Advancement and career progression",
                "Working in a supportive, collaborative environment",
                "Clear structure and predictability",
                "Opportunities for creativity and self-expression",
                "Job security and stability"
            ],
            'C': [  # Skills and Abilities
                "Analyzing complex information",
                "Communicating clearly and persuasively",
                "Organizing and managing multiple tasks",
                "Solving technical problems",
                "Building and maintaining relationships",
                "Being creative and innovative",
                "Making effective decisions",
                "Paying attention to detail",
                "Leading and inspiring others",
                "Adapting to changing circumstances",
                "Working effectively in teams",
                "Resolving conflicts and disagreements",
                "Planning and prioritizing work",
                "Thinking critically and logically",
                "Understanding others' perspectives and feelings"
            ],
            'D': [  # Environment Preferences
                "I prefer a fast-paced environment with variety.",
                "I prefer a private workspace rather than an open office.",
                "I prefer organizations that encourage innovation.",
                "I prefer a consistent schedule rather than variable hours.",
                "I enjoy competitive environments.",
                "I work best in collaborative settings.",
                "I prefer flat organizations over hierarchical ones.",
                "I would enjoy working remotely.",
                "I prefer environments with regular social interaction.",
                "I prefer clear policies and procedures."
            ]
        }
        
        return questions
    
    def get_questions(self):
        """Return the assessment questions"""
        return self.questions
    
    def process_responses(self, responses):
        """Process user responses and return career recommendations"""
        return self.model.process_answers(responses)


def create_sample_response():
    """Create a sample response to demonstrate the assessment"""
    # Create a sample set of answers (1-5 scale)
    sample_answers = {
        'A': [2, 4, 3, 4, 3, 4, 5, 3, 4, 4, 3, 3, 4, 3, 5, 4, 3, 4, 4, 4],
        'B': [4, 5, 3, 4, 4, 5, 4, 4, 5, 5, 4, 4, 3, 5, 3],
        'C': [5, 4, 3, 4, 4, 5, 4, 3, 4, 4, 4, 3, 4, 5, 4],
        'D': [4, 3, 5, 3, 3, 4, 4, 4, 4, 3]
    }
    
    # Create assessment and process answers
    assessment = CareerAssessment()
    result = assessment.process_responses(sample_answers)
    
    return result


if __name__ == "__main__":
    # Create a sample result
    result = create_sample_response()
    
    # Display key insights
    print("Personality Dimensions:")
    for dim, score in result['personality_profile']['dimension_scores'].items():
        print(f"  {dim}: {score}")
    
    print("\nProfile Summary:")
    print(result['personality_profile']['summary'])
    
    print("\nTop Career Matches:")
    for career in result['career_recommendations']:
        print(f"  {career['career']}: {career['score']}% match")
    
    print("\nWork Style:")
    for style, description in result['work_style'].items():
        print(f"  {style.replace('_', ' ').title()}: {description}")
    
    print("\nPrimary Motivators:")
    print("  " + ", ".join(result['values_and_motivators']['primary_motivators']))
    
    print("\nKey Strengths:")
    print("  " + ", ".join(result['strengths_and_growth']['key_strengths']))
    
    print("\nIdeal Environment:")
    for aspect, description in result['ideal_environment'].items():
        print(f"  {aspect.replace('_', ' ').title()}: {description}")