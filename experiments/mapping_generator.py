import pandas as pd
import pickle

df = pd.read_csv("./archive/symptom_precaution.csv")

mapping: dict[str, list[str]] = {}
for row in df.iterrows():
    mapping.update(
        {
            str(row[1].Disease).strip(): [
                str(row[1].Precaution_1).strip(),
                str(row[1].Precaution_2).strip(),
                str(row[1].Precaution_3).strip(),
                str(row[1].Precaution_4).strip(),
            ]
        }
    )

with open("diseases_precaution_mapping_file.pkl", "wb") as f:
    pickle.dump(mapping, f)
