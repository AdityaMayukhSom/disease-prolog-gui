from typing import Dict, List, Optional


def title_case(input: str, sep: str = " "):
    """
    Convert an input string to title case by capitalizing the first letter
    of each word, where words are separated by a specified separator.

    Arguments
    ---------
    `@Required` `input`: `str`

    The input string to be converted to title case.

    `@Optional` `sep`: `str`

    The separator used to split the input string into words.
    Default is " " (space).

    Returns
    -------
    A new string joined by white spaces in title case where the first letter
    of each word is capitalized.

    Notes
    -----
    1. Words are defined as substrings separated by the provided separator.
    """
    # Split the input string by underscores
    words = input.split(sep)

    # Capitalize the first letter of each word and join them back
    title_case = " ".join(word.capitalize() for word in words)
    return title_case


def encrypt_diseases(
    diseases_list: List[str],
    diseases_mapping: Dict[str, int],
) -> int:
    combined_mask = 0
    for disease in diseases_list:
        combined_mask |= diseases_mapping[disease]
    return combined_mask


def encrypt_symptoms(
    symptoms_list: List[str],
    symptoms_mapping: Dict[str, int],
) -> int:
    combined_mask = 0
    for symptom in symptoms_list:
        combined_mask |= 1 << symptoms_mapping[symptom]
    return combined_mask


def decrypt_symptoms(
    symptoms: int, symptoms_mapping: Dict[str, int]
) -> List[str]:
    """
    Utility function to decrypt the encoded symptoms which is an integer and
    obtain a list of corresponding symptom keys.

    Arguments
    ---------
    `@Required` `symptoms`: `int`

    The encoded version of the symptoms.

    `@Required` `symptoms_mapping`: `Dict[str, int]`

    A dictionary containing the symptom keys as the dictionary keys and the
    number of bits to shift to obtain the corresponding encoding of the symptom.

    Returns
    -------
    A List[str] containing the symptom keys that match with the provided
    encoded symptoms.

    Raises
    ------
    `KeyError` if no symptom corresponding to the position of a set bit is present.
    """

    # the position of shifts required is the key and the symptomp is the value
    reverse_symptoms_mapping: Dict[int, str] = {
        symptoms_mapping[key]: key for key in symptoms_mapping.keys()
    }

    try:
        symptoms_list: List[str] = [
            reverse_symptoms_mapping[i]
            for i in range(1, symptoms.bit_length() + 1)
            if symptoms & (1 << i)
        ]
    except KeyError:
        raise KeyError("no symptom corresponding to the position of set bit")

    return symptoms_list


def find_matching_diseases(
    symptoms: int | List[str],
    diseases_mapping: Dict[str, int],
    symptoms_mapping: Optional[Dict[str, int]] = None,
) -> List[str]:
    """
    Utility function to find the diseases that are possible with the
    given set of symptoms.

    Arguments
    ---------
    `@Required` `symptoms`: `int | List[str]`

    The encoded version of the list of symptom keys or the list
    of keys itself.

    `@Required` `diseases_mapping`: `Dict[str, int]`

    A dictionary containing the diseases along with their encodings
    i.e. number obtained by the bitwise OR operation of the encodings
    corresponding to the symptoms that are seen in case of the disease.

    `@Optional` `symptoms_mapping`: 'Dict[str, int]`

    Required in case of `symptoms` being a `List[str]`. It must contain
    the symptom keys as the dictionary keys and the number of bits unity
    must be shifted to obtain the corresponding encoding of the symptom.

    Returns
    -------
    A List[str] containing the names or keys of the diseases that matches
    with the symptoms provided. In case no disease is matched, returns an
    empty list.

    Raises
    ------
    1. `ValueError` if `symptoms` is `List[str]` and `symptoms_mapping` is
    not provided.
    2. `ValueError` if `symptoms` is not of type `List` or `int`

    Notes
    -----
    1. `symptoms_mapping` does not contain the encoding itself, but
    number of places unity must be shiftes to get the encoding.
    """
    symptoms_mask: int

    if isinstance(symptoms, List) and symptoms_mapping is not None:
        symptoms_mask = encrypt_symptoms(symptoms, symptoms_mapping)
    elif isinstance(symptoms, int):
        symptoms_mask = symptoms
    else:
        raise ValueError(
            "symptoms must be either int or List[str].\nIn case of List[str], symptoms_mapping must be provided."
        )

    matching_diseases: List[str] = [
        disease
        for disease in diseases_mapping
        if (diseases_mapping[disease] & symptoms_mask) == symptoms_mask
    ]

    return matching_diseases


def get_next_questions_set(
    selected_symptoms: List[str],
    already_asked_mask: int,
    symptoms_mapping: Dict[str, int],
    diseases_mapping: Dict[str, int],
) -> tuple[int, list[str]]:
    matching_diseases = find_matching_diseases(
        symptoms=selected_symptoms,
        symptoms_mapping=symptoms_mapping,
        diseases_mapping=diseases_mapping,
    )

    diseases_mask = encrypt_diseases(
        diseases_list=matching_diseases, diseases_mapping=diseases_mapping
    )

    next_set_mask: int = diseases_mask & ~already_asked_mask

    next_set_questions: List[str] = []

    for symptom in symptoms_mapping:
        if 1 << symptoms_mapping[symptom] & next_set_mask != 0:
            next_set_questions.append(symptom)

    return (next_set_mask, next_set_questions)
