## Disease Prediction System (Frontend)

This is the frontend of a disease prediction system where the user is asked questions to gather information about their symptoms. Based on the user's answers, the system sends a request to the backend to predict the disease. The backend then returns a response with the details of the predicted disease, which are displayed to the user.

## Disclaimer

This is a college project and is not intended to be used for medical diagnosis. Please consult a doctor if you are concerned about your health.

## Features

1. Ask the user questions to gather information about their symptoms.
2. Send a request to the backend to predict the disease based on the user's answers.
3. Display the details of the predicted diseases and precautions to the user.

## Technology Stack
1. **React:** Chosen for its declarative style, performance, and scalability in building single-page applications, enabling dynamic UI elements.

2. **TypeScript:** Implemented for type safety and error prevention in handling sensitive medical data, enhancing code readability.

3. **Tailwind CSS:** Utilized for efficient custom design, ensuring a user-friendly interface and reducing CSS code volume.

4. **Vite:** Selected as a lightweight, fast build tool for streamlined project setup and faster deployment.

## Usage

1. Open the browser and navigate to [https://disease-ai-frontend.vercel.app/](https://disease-ai-frontend.vercel.app/).
1. Answer the questions that are asked to you by checking or unchecking the checkboxes.
2. Once you have answered all of the questions, click on the "Find Disease" button.
3. The system will send the data to the backend for prediction.
4. The system will display the details of the predicted disease to you.

## Local Installation Setup

To run the Disease Prediction System frontend locally, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

2. Clone the repository from the project's GitHub page

   ```bash
   git clone git@github.com:AdityaMayukhSom/disease-frontend.git
   ```


3. Navigate to the project directory

   ```bash
   cd disease-frontend
   ```

4. Install the project's dependencies using npm

   ```bash
   npm install
   ```

5. Start the development server by running

   ```bash
   npm run dev
   ```

6. Open your web browser and go to [http://localhost:5173](http://localhost:5173).

7. You can now interact with the disease prediction system locally. Answer the questions and click on the "Find Disease" button to see the results.

**Note :** You must run the backend server or use the hosted backend API endpoint for the complete application to work.


## Deployment

The project is deployed on [Vercel](https://vercel.com/dashboard). The CI/CD pipeline is structured so that it will automatically rebuild the project whenever new code is pushed to the repository. 


**Note :** This assignment is for third-year students currently enrolled in the Artificial Intelligence Lab at Jadavpur University in 2023. External contributions are not allowed. Please do not copy any part of this code or README.md file without proper attribution. Plagiarism is a serious offense and will not be tolerated.



