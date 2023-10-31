## Disease Prediction System Backend

The Disease Prediction System Backend is a component of the Disease Prediction System. It's responsible for handling the AI-based disease prediction logic and serving as an API for the frontend. This document provides instructions on how to set up and run the backend.

### Disclaimer

This is a college project and is not intended to be used for medical diagnosis. Please consult a doctor if you are concerned about your health.

## Project Structure

The project uses mainly FastAPI for creating the REST API, uvicorn as a server, sqlalchemy as an ORM and Docker for containerization.

The backend project consists of the following components:

- `main.py`: The main FastAPI application.
- `schema.py`: Defines data schemas for request and response objects.
- `prolog_utils.py`: Utility functions for interfacing with the Prolog knowledge base.
- `database.py`: Database operations and configurations.
- `pickle_files/`: Directory containing pickle files for disease and symptom mapping.
- `prolog_files/`: Directory containing Prolog knowledge base files.
- `requirements.txt`: List of required Python packages.
- `Dockerfile`: Docker configuration for containerizing the backend application.

## Installation

### Docker (Recommended)

1. Install Docker on your system if not already installed. You can download it from [Docker's official website](https://www.docker.com/get-started).

2. Clone the backend repository:

   ```bash
   git clone git@github.com:AdityaMayukhSom/disease-backend.git
   ```

3. Change directory to the backend folder:

   ```bash
   cd disease-prediction-backend
   ```

4. Build and run the Docker container:

   ```bash
   docker build -t disease-prediction-backend .
   docker run -d -p 8000:8000 disease-prediction-backend
   ```

**Note :** For detailed understanding of the deployment environment, please check the `Dockerfile`.

### Manual Setup (Without Docker)

1. Clone the backend repository:

   ```bash
   git clone git@github.com:AdityaMayukhSom/disease-backend.git
   ```

2. Change directory to the backend folder:

   ```bash
   cd disease-prediction-backend
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend application:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

## Usage

Once the backend is up and running, it will provide API endpoints for the frontend to interact with. The frontend can be configured to use the backend's API for disease prediction.

The documentation for the endpoints can be found both at [Docs](https://disease-ai-backend.onrender.com/redoc) and inline with the code.

## Deployment

The backend can be deployed on various platforms, and it is hosted on [Render](https://render.com) with the endpoint: [https://disease-ai-backend.onrender.com](https://disease-ai-backend.onrender.com). `Render` spins up a new container and builds up the image with the help of `Dockerfile` whenever new code is pushed to this repository. 



**Note** : This assignment is for third-year students currently enrolled in the Artificial Intelligence Lab at Jadavpur University in 2023. External contributions are not allowed. Please do not copy any part of this code or README.md file without proper attribution. Plagiarism is a serious offense and will not be tolerated.


---

**Author :**  [Aditya Mayukh Som](mailto:adi.kg2@gmail.com)