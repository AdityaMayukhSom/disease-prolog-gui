import pandas as pd
import pickle

df = pd.read_csv("./archive/description.csv")

mapping: dict[str, str] = {}
for row in df.iterrows():
    disease_name = "_".join(
        row[1]
        .Disease.strip()
        .lower()
        .replace("(", " ")
        .replace(")", " ")
        .split()
    )
    mapping.update({disease_name: row[1].Description.strip()})

with open("diseases_description_mapping_file.pkl", "wb") as f:
    pickle.dump(mapping, f)
