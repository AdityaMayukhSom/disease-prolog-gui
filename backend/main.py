from typing import List

from fastapi import FastAPI

from .utils import (
    encrypt_symptoms,
    find_matching_diseases,
    generate_next_set_questions,
)
from .database import get_mappings
from .schema import SelectedSymptoms

app = FastAPI()


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
        "already_asked_mask": already_asked_mask,
        "selected_mask": 0,
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
        next_questions_mask,
        next_questions,
    ) = generate_next_set_questions(
        selected_symptoms,
        already_asked_mask,
        symptoms_mapping,
        diseases_mapping,
    )

    already_asked_mask |= next_questions_mask
    already_selected_symptoms_mask |= symptoms_mask

    return {
        "already_asked_mask": already_asked_mask,
        "selected_mask": selected_symptoms_mask,
        "next_questions": next_questions,
    }


@app.post("/matching-diseases")
def get_matching_diseases():
    pass


if __name__ == "__main__":
    symptoms_mapping, diseases_mapping = get_mappings()

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

    already_asked_mask = initial_mask
    selected_symptoms_mask = 0

    selected_symptoms = ["high_fever", "nausea"]
    symptoms_mask = encrypt_symptoms(selected_symptoms, symptoms_mapping)

    # this is for testing purposes because for testing,
    # in real world scenario, the user will not be able to select
    # extra diseases than initial questions on the first go
    already_asked_mask |= symptoms_mask

    (
        next_set_mask,
        next_set_questions,
    ) = generate_next_set_questions(
        selected_symptoms,
        already_asked_mask,
        symptoms_mapping,
        diseases_mapping,
    )

    already_asked_mask |= next_set_mask
    selected_symptoms_mask |= symptoms_mask

    matching_diseases = find_matching_diseases(
        symptoms=selected_symptoms_mask, diseases_mapping=diseases_mapping
    )

    print(next_set_questions)
    print(matching_diseases)
