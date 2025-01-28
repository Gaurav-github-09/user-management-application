**In this project**, i've built an **User Management** app.

**Skills used** : HTML, CSS, React.js

**Live link** : [https://gaurav-github-09.github.io/user-management-application/](https://gaurav-github-09.github.io/user-management-application/)

# User Management App


### Refer to the video below:



<br/>

**Video 1**

https://github.com/user-attachments/assets/a0be7051-3647-4304-9504-fd4be424183c



**Video 2**



https://github.com/user-attachments/assets/fd854081-33b2-49b0-8dd7-3f837887fdfc





<br/>


This React application allows users to manage a list of users. 

**Key Features:**

* **User Listing:**
    * Fetches a list of users from a JSON Server API.
    * Displays user data in a table format, including ID, First Name, Last Name, Email, and Department.
    * Implements pagination for efficient navigation through large datasets.

-----------------------------------------

* **User Creation:**
    * Provides a form for creating new users.
    * Includes input fields for First Name, Last Name, Email, and Department.
    * Validates user input (e.g., required fields, email format).
    * Sends a POST request to the API to create a new user.
    * Dynamically adds the newly created user to the user list.


----------------------------------------
* **User Editing:**
    * Enables editing existing user details.
    * Populates the form with the details of the selected user.
    * Allows users to modify and save changes.
    * Sends a PUT request to the API to update the user information.
    * Refreshes the user list with the updated data.

-----------------------------------------

* **User Deletion:**
    * Provides a "Delete" button for each user.
    * Confirms user action before deleting.
    * Sends a DELETE request to the API to remove the user.
    * Removes the deleted user from the displayed list.


--------------------------------------------
* **Error Handling:**
    * Gracefully handles potential errors during API interactions (e.g., network issues, server errors).
    * Displays informative error messages to the user.


----------------------------------------------------

* **User Interface:**
    * Clean and user-friendly interface with clear labels and intuitive navigation.
    * Utilizes CSS for basic styling and visual enhancements.

-------------------------------------------

**Getting Started**

1. **Clone the repository:**
   ```bash

   git clone https://github.com/Gaurav-github-09/user-management-application.git

2. **Install dependencies:**
   ```bash

   cd user-management-application

   npm install

3. **Start the development server:**
   ```bash

   npm start

---------------------------------

**Project Structure:**

- **src/**: Contains the source code for the React application.
* **App.js**: Main application component.
+ **userManagement/index.js**: Component for user management functionality.
- **userManagement/index.css**: Styling for user management functionality.
* **public/**: Contains the index.html file.
+ **package.json**: Contains project dependencies and scripts.

------------------------------------------------------

**This enhanced README provides more specific details about the application's functionality, making it more informative for potential users.**
