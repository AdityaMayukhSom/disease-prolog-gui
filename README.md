# Disease Prediction Expert System

**Name :** Aditya Mayukh Som <br/>
**Roll Number :** 002111001123 <br/>
**Current Year :** 3rd Year <br/>
**Semester :** 5th Semester

## Abstract

This project implements an expert system for medical disease diagnosis facilities with several human diseases using the following methodologies:

1. Rule-based systems
2. Knowledge-based systems
3. Database methodology
4. Inference engines
5. System-user interaction

The system works by first asking the user a series of questions about their symptoms. Based on the user's answers, the system generates a list of symptoms. The system then uses a Prolog query to find the matching diseases and displays them to the user.

## Attributions

This project uses a knowledge base derived from the Kaggle dataset available at this link : [Kaggle Dataset Link](https://www.kaggle.com/datasets/itachi9604/disease-symptom-description-dataset). 


## Technologies

**Frontend:** React, TypeScript, TailwindCSS, Vite <br/>
**Frontend URL :** [GitHub](https://github.com/AdityaMayukhSom/disease-frontend) <br/>

**Backend:** Python, Prolog, FastAPI, Docker<br/>
**Backend URL :** [GitHub](https://github.com/AdityaMayukhSom/disease-backend)

The system creates a mapping between symptoms and diseases, and then predicts the corresponding disease or diseases based on the user's selected symptoms.

## Live Demo

**URL :** [Live Project Link](https://disease-ai-frontend.vercel.app/) <br/>
**Note :** The backend server may require a cold boot when it receives a new request after a period of inactivity. This means that it may take a minute for the server to respond to your request. If you see a loading screen, please be patient and refresh the page after a minute.

## Process of Generating Next Set of Questions

This project uses a novel bitmasking approach developed in collaboration with [Debabrata Mondal](https://github.com/0xDebabrata) to generate the next set of questions. Each symptom is assigned a number based on the number of diseases it may cause. The mask of a disease is computed as the bitwise OR of the masks of all the symptoms associated with that disease.

When the user selects their initial symptoms, these symptoms are converted into their respective masks and a new mask is created by computing the bitwise OR of all the selected symptoms. Bitwise AND operations are then performed with all diseases. If the result equals the newly created mask, additional questions about the other symptoms of that disease are presented. This approach creates a chain of questions that aids in precise disease prediction.


## Scope

This project is a valuable tool for patients who are seeking medical help for diagnosis and treatment of various health problems. The system, with the help of more data, can be used to help patients identify their health problems and receive suitable treatment without requiring medical assistance.

---

**Note:** This project is intended for educational purposes and should not be used as a replacement for medical advice from a qualified medical professional.