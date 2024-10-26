# Leaderboard Project

## Overview
The Leaderboard project is a web application that allows users to register, log in, view their rankings based on points, and claim points. It features a responsive design built with React and a RESTful API backend built with Node.js and Express.


## Project Functionality

The Leaderboard project is designed to provide a seamless user experience with a variety of features aimed at enhancing engagement and interaction. Below are the detailed functionalities:

### 1. User Authentication
- **Registration**: New users can create an account by providing their first name, last name, email, username, and password. Upon successful registration, they receive a confirmation message.
- **Login**: Existing users can log in using their credentials (username and password). If the login is successful, they are redirected to the homepage, where they can access the leaderboard.

### 2. Homepage Functionality
Upon successful login, users are directed to the homepage, which serves as the central hub for viewing and interacting with other users in the system. Key features include:

- **Friends List**: The homepage prominently features a list of users (friends), excluding the currently logged-in user. This encourages users to connect with others while maintaining a sense of competition.
   
- **User Information**: Each entry in the friends list includes:
  - **Name**: Displayed prominently, showing the user's first and last name.
  - **Points**: The total points awarded to each user, providing insight into their performance.

- **Claim Points Functionality**: Next to each user’s details, there is a "Claim Points" button that allows users to claim points for that specific user. This feature encourages active participation in the leaderboard system.
- **Feedback on Action**: Upon clicking the button, users receive immediate feedback through a notification indicating whether the action was successful or if an error occurred.

### 3. Leaderboard Display
- **Leaderboard Types**: Users can view the leaderboard in three categories: 
  - **Daily**: Displays the top users based on points claimed in the last 24 hours.
  - **Weekly**: Shows rankings for the last 7 days.
  - **Monthly**: Ranks users based on their performance over the past month.
  
- **Top Users Section**: The top three users are prominently displayed at the top of the leaderboard page, showing their usernames, total points, and ranks.

- **All Users Table**: Below the top users, a comprehensive table lists all users, including their rank, username, total points, and any prizes won. Users can click on any username to view more details.

### 4. User History
- **View User History**: Users can click on their username in the leaderboard to open a modal that displays their points claiming history. This feature helps users track their engagement and performance over time.
- **History Details**: The history includes dates and the amount of points awarded, allowing users to understand their progression.

### 5. Responsive Design
- **Mobile-Friendly Interface**: The application is designed to be responsive, ensuring that users can access it easily from both desktop and mobile devices. The layout adjusts appropriately to different screen sizes, providing an optimal user experience.

### 6. Notifications
- **User Feedback**: The application utilizes toast notifications to inform users of successful actions, such as logging in, registering, claiming points, and any errors that may occur during these processes.

### 7. Error Handling
- **Robust Error Messages**: The application provides clear error messages for various failure points, such as incorrect login credentials or registration issues, enhancing user experience and guiding them toward resolution.

## Conclusion
The Leaderboard project combines user-friendly design with powerful functionality, allowing users to engage with the application and track their progress in a competitive environment. Whether you're a casual user or someone looking to climb the ranks, this application provides all the tools needed to succeed.
