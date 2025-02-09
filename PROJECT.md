# Test Project

# Objective:

Create an API to log movement of people with time and use this data to display this on Google Map in real time.

## Microservice

1. You have a list of 20 people.
2. Create a microservice in NodeJS to generate a set of GPS coordinates(latitude and longitude) every X seconds for each person.
3. The next GPS coordinate generated must be generated randomly between 0 and 50 meters from the previous one.
4. The initial direction can be chosen at random and the rest can vary randomly in slight variation adjescent to the initial direction.
5. Cardinal points reference: http://ahoy.tk-jk.net/macslog/BoxingtheCompas.html

## Backend and API

1. Create a backend using Laravel and Filament
2. Add an API using Laravel to consume the GPS coordinates, timestamp and person everytime it is generated.
3. Use a relational database to store the data.

## UI

1. Build a UI with basic authentication.
2. Admin can view movements of each person on Google Map.
3. User can view only his movements on Google Map.
4. Each GPS point is a yellow dot.
5. New GPS point is connected to Old GPS point using a red line.
6. Everytime a new GPS coordinate is generated, it shows up in the Google Map in real time.

# Technical Requirements

1. Microservice:

- Use Node.js with Express.

2. Front-End:

- Use React or Angular.
- Responsive design with Tailwind CSS or Bootstrap.
- Front-end communicates with the back-end through RESTful APIs.

3. Back-End:

- Use Laravel.
- Expose RESTful endpoints for authentication, listings, and role-based actions.
- Integrate Google Geocoding API to convert addresses to coordinates.

4. Database:

- Use PostgreSQL or MySQL.
- Design normalized tables for users and listings with relationships.
- Include a migration file for database setup.

5. Deployment:

- Deploy the app on a platform like Heroku, Vercel, or AWS.
- Provide clear setup instructions for running the project locally and in production.

# Project Workflow

1. Create a GitHub repository and invite arvish.mungur@solar-transit.net as a collaborator.

2. Maintain a clear and logical commit history reflecting progress.

3. Provide a README file with:

- Project overview.
- Instructions for setup (including database migrations).
- Deployment link (if applicable).

# Assessment Criteria

1. Database Design:

- Proper use of relational database principles.
- Efficient queries and relationships.

2. Code Quality:

- Clean, maintainable code following DRY and SOLID principles.

3. Functionality:

- Fulfillment of all required features.

4. Version Control:

- Clear and descriptive commit messages.
- Proper use of branches for features or bug fixes.

5. Documentation:

- Comprehensive README file with setup, usage, and deployment details.

# Estimated Time

- Microservice: 6-8 hours
- Front-End: 6–8 hours
- Back-End & Database: 6–8 hours
- Deployment and Documentation: 2–4 hours

This project evaluates practical skills in relational databases, API design, front-end integration, and collaboration via GitHub.
