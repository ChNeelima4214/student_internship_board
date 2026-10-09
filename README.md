Student Internship Board

Project Overview

The Student Internship Board is a responsive web application that allows students to search internships, filter them by domain and work mode, view internship details, and submit applications.

Features

- Search internships by title, domain, location, and skills.
- Filter internships by domain and work mode.
- View internship details.
- Submit applications using name and email.
- Validate applicant name and email.
- Prevent duplicate applications for the same internship.
- Store applications in a JSON file.
- Display loading, error, and empty states.
- Responsive layout for mobile and desktop screens.
- Keyboard-friendly search, filters, and buttons.

Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- JSON

Project Structure

- "public/index.html" — Frontend interface
- "server.js" — Express server and API routes
- "data/internship.json" — Internship seed data
- "data/applications.json" — Saved applications
- "package.json" — Project configuration

Setup Instructions

1. Install Node.js.

2. Open the project folder in Visual Studio Code.

3. Open the terminal in the project folder.

4. Install dependencies:
   
   "npm install"

5. Start the application:
   
   "npm start"

6. Open "http://localhost:3000" in your browser.

API Endpoints

- "GET /api/internships" — Retrieve and filter internships.
- "GET /api/internships/:id" — Retrieve a specific internship.
- "POST /api/applications" — Submit an application.

Testing

- Internship listing and search tested.
- Domain and work-mode filters tested.
- Internship details tested.
- Valid application submission tested.
- Application persistence in JSON tested.
- Duplicate application rejection tested.

Environment Variables

- "PORT" — Optional server port. Defaults to "3000".

Deployment

Deployment URL: Pending

Walkthrough

A project walkthrough and final submission evidence will be added before submission.