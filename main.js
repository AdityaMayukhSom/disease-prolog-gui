const session = pl.create();
const symptomsForm = document.getElementById("symptoms_form");
const outputSection = document.getElementById("output-section")

symptomsForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = new FormData(symptomsForm)
    const symptoms = data.getAll('symptoms')
    if (symptoms.length === 0) {
        console.log('must select atleast one symptom')
        return
    }
    document.getElementById("submit-button").disabled = true;
    const diseaseArray = await findDiseases(symptoms)

    if (diseaseArray.length === 0) {
        outputSection.innerText = 'no disease found'
        return
    }

    console.log(diseaseArray)

    diseaseArray.forEach(disease => {
        const diseaseName = document.createElement('div')
        diseaseName.innerText = disease
        outputSection.appendChild(diseaseName)
    })

    symptomsForm.reset()
    document.getElementById("submit-button").disabled = false;

});


function convertToPrologString(symptoms) {
    const prologString = symptoms.map(symptom => `${symptom}(X)`).join(', ');
    return `(${prologString})`;
}


async function findDiseases(symptoms_list) {
    const program = "knowledge_base.pl";
    const goal = `findall(X, ${convertToPrologString(symptoms_list)}, Diseases).`
    const session = pl.create();
    await session.promiseConsult(program);
    await session.promiseQuery(goal);
    console.log(pl)

    let diseaseString = ''
    for await (let answer of session.promiseAnswers()) {
        diseaseString += session.format_answer(answer)
    }

    const matches = diseaseString.match(/\[(.*?)\]/);
    const diseaseArray = matches ? matches[1].split(',') : [];
    return diseaseArray
}

