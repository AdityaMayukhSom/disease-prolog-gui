import sys
import pickle

from typing import Dict


def get_mappings():
    try:
        with open(
            "./pickle_files/symptoms_mapping_file.pkl", "rb"
        ) as symptoms_mapping_file, open(
            "./pickle_files/diseases_mapping_file.pkl", "rb"
        ) as diseases_mapping_file:
            symptoms_mapping: Dict[str, int] = pickle.load(symptoms_mapping_file)
            diseases_mapping: Dict[str, int] = pickle.load(diseases_mapping_file)
            return symptoms_mapping, diseases_mapping
    except OSError:
        print("could not open pickle files")
        sys.exit(1)
