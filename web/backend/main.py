from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils import (
    encrypt_symptoms,
    find_matching_diseases,
    generate_next_set_questions,
)
from database import get_mappings
from schema import SelectedSymptoms

origins: List[str] = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

app = FastAPI()

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/initial-questions")
def get_initial_questions():
    symptoms_mapping, _ = get_mappings()

    initial_questions: List[str] = [
        "high_fever",
        "vomiting",
        "fatigue",
        "headache",
        "chills",
        "cough",
        "skin_rash",
        "constipation",
        "swelling_joints",
    ]

    initial_mask = 0
    for question in initial_questions:
        initial_mask |= 1 << symptoms_mapping[question]

    already_asked_mask: int = initial_mask

    return {
        "already_asked_mask": str(already_asked_mask),
        "selected_mask": str(0),
        "initial_questions": initial_questions,
    }


@app.post("/next-questions")
def get_next_questions(request: SelectedSymptoms):
    already_asked_mask: int = request.already_asked_mask
    already_selected_symptoms_mask: int = request.already_selected_symptoms_mask

    selected_symptoms: List[str] = request.symptoms

    (symptoms_mapping, diseases_mapping) = get_mappings()

    symptoms_mask = encrypt_symptoms(
        symptoms_list=selected_symptoms,
        symptoms_mapping=symptoms_mapping,
    )

    # this is for testing purposes because for testing,
    # in real world scenario, the user will not be able to select
    # extra diseases than initial questions on the first go
    already_asked_mask |= symptoms_mask

    (
        next_set_mask,
        next_set_questions,
    ) = generate_next_set_questions(
        selected_symptoms=selected_symptoms,
        already_asked_mask=already_asked_mask,
        symptoms_mapping=symptoms_mapping,
        diseases_mapping=diseases_mapping,
    )

    already_asked_mask |= next_set_mask
    already_selected_symptoms_mask |= symptoms_mask

    return {
        "already_asked_mask": str(already_asked_mask),
        "selected_mask": str(already_selected_symptoms_mask),
        "next_questions": next_set_questions,
    }


@app.post("/matching-diseases")
def get_matching_diseases(request: SelectedSymptoms):
    already_selected_symptoms_mask: int = request.already_selected_symptoms_mask
    selected_symptoms: List[str] = request.symptoms

    (symptoms_mapping, diseases_mapping) = get_mappings()

    symptoms_mask: int = encrypt_symptoms(
        symptoms_list=selected_symptoms,
        symptoms_mapping=symptoms_mapping,
    )

    already_selected_symptoms_mask |= symptoms_mask

    matching_diseases: List[str] = find_matching_diseases(
        symptoms=already_selected_symptoms_mask,
        diseases_mapping=diseases_mapping,
    )

    return {"diseases": matching_diseases}
