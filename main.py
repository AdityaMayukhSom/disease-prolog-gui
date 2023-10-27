import sys
import pickle
from typing import Dict, List


def generate_diseases_map_from_list(
    diseases: List[str], diseases_mapping: Dict[str, int]
):
    combined_mask = 0
    for disease in diseases:
        combined_mask |= diseases_mapping[disease]
    return combined_mask


def generate_symptoms_map_from_list(
    symptoms: List[str], symptoms_mapping: Dict[str, int]
):
    combined_mask = 0
    for symptom in symptoms:
        combined_mask |= 1 << symptoms_mapping[symptom]
    return combined_mask


def generate_matching_diseases_from_symptoms_list(
    symptoms_list: List[str],
    symptoms_mapping: Dict[str, int],
    diseases_mapping: Dict[str, int],
):
    symptoms_mask = generate_symptoms_map_from_list(symptoms_list, symptoms_mapping)

    matching_diseases = [
        disease
        for disease in diseases_mapping
        if (diseases_mapping[disease] & symptoms_mask) == symptoms_mask
    ]

    return (symptoms_mask, matching_diseases)


def generate_matching_diseases_from_symptoms_mask(
    symptoms_mask: int,
    diseases_mapping: Dict[str, int],
):
    matching_diseases = [
        disease
        for disease in diseases_mapping
        if (diseases_mapping[disease] & symptoms_mask) == symptoms_mask
    ]

    return matching_diseases


def generate_next_set_questions(
    selected_symptoms: List[str],
    already_asked_mask: int,
    symptoms_mapping: Dict[str, int],
    diseases_mapping: Dict[str, int],
):
    _, matching_diseases = generate_matching_diseases_from_symptoms_list(
        selected_symptoms, symptoms_mapping, diseases_mapping
    )

    next_set_mask = (
        generate_diseases_map_from_list(matching_diseases, diseases_mapping)
        & ~already_asked_mask
    )

    next_set_questions: List[str] = []

    for symptom in symptoms_mapping:
        if 1 << symptoms_mapping[symptom] & next_set_mask != 0:
            next_set_questions.append(symptom)

    return (next_set_mask, next_set_questions)


if __name__ == "__main__":
    try:
        symptoms_mapping_file = open("./pickle_files/symptoms_mapping_file.pkl", "rb")
        diseases_mapping_file = open("./pickle_files/diseases_mapping_file.pkl", "rb")
    except OSError:
        print("could not open pickle files")
        sys.exit(1)

    with symptoms_mapping_file, diseases_mapping_file:
        symptoms_mapping: Dict[str, int] = pickle.load(symptoms_mapping_file)
        diseases_mapping: Dict[str, int] = pickle.load(diseases_mapping_file)

        initial_questions = [
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
        symptoms_mask = generate_symptoms_map_from_list(
            selected_symptoms, symptoms_mapping
        )

        # this is for testing purposes because for testing,
        # in real world scenario, the user will not be able to select
        # extra diseases than initial questions on the first go
        already_asked_mask |= symptoms_mask

        next_set_mask, next_set_questions = generate_next_set_questions(
            selected_symptoms, already_asked_mask, symptoms_mapping, diseases_mapping
        )
        already_asked_mask |= next_set_mask
        selected_symptoms_mask |= symptoms_mask

        generate_matching_diseases_from_symptoms_list(
            selected_symptoms, symptoms_mapping, diseases_mapping
        )

        print(next_set_questions)

        print(
            generate_matching_diseases_from_symptoms_mask(
                selected_symptoms_mask, diseases_mapping
            )
        )
