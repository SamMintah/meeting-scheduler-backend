
# Meeting Scheduling Feature

## Overview
The Meeting Scheduling Feature provides a streamlined way to manage meetings with functionality to create, view, update, and delete meeting schedules. It also includes an endpoint to retrieve available slots for scheduling.

## Features
- Create, update, delete, and view meetings.
- Retrieve available slots for scheduling.
- Validation for overlapping times and user authentication.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/scheduling-feature.git
   cd scheduling-feature
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   ```

4. Run the application locally:
   ```bash
   npm start
   ```

5. Run tests:
   ```bash
   npm test
   ```

## API Documentation
The API endpoints are documented in Postman. You can access the full documentation via the link below:

[Postman API Documentation](https://esoko-877757.postman.co/workspace/4f3ed6d9-c436-4b2c-a5b4-9b84dea5e39b/documentation/28881953-399f7c28-567a-41ff-afd9-b5505ef59b76)

## Routes Overview

| Method | Endpoint                          | Description                       |
|--------|-----------------------------------|-----------------------------------|
| POST   | `/meetings`                       | Create a new meeting.            |
| GET    | `/users/:userId/meetings`         | Get all meetings for a user.     |
| GET    | `/users/:userId/available-slots`  | Get available slots for a user.  |
| PUT    | `/meetings/:meetingId`            | Update an existing meeting.      |
| DELETE | `/meetings/:meetingId`            | Delete a meeting.                |

## How to Contribute
1. Fork the repository and create a new branch.
2. Make your changes and write tests.
3. Submit a pull request for review.

## CI/CD Pipeline
 I use GitHub Actions for continuous integration. Tests are automatically run on every push or pull request to the `main` branch. See `.github/workflows/test.yml` for the pipeline configuration.

---

