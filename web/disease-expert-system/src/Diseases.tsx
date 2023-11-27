import Disease from "./Disease";

const Diseases = ({ diseases }: { diseases: Disease[] }) => {
  return diseases.length ? (
    <section className="max-w-3xl py-5 px-4">
      <div className="flex justify-between items-center w-full ">
        <h3 className="text-2xl font-bold text-white ">Possible Diseases:</h3>
        <button type="button" onClick={() => location.reload()}>
          Reset
        </button>
      </div>
      <ul className="card  rounded-lg p-4">
        {diseases.map((d) => (
          <li
            key={d.name}
            className="disease mb-4 border-b border-gray-700 py-4"
          >
            <h2 className="text-2xl text-white font-bold mb-2">{d.name}</h2>
            <p className="text-gray-300 mb-2 text-justify">{d.description}</p>
            <h2 className=" text-white font-semibold my-2">
              Suggested Precautions :
            </h2>

            <ol className="list-decimal ml-6">
              {d.precautions.map((precaution) => (
                <li className="text-gray-400" key={precaution}>
                  {precaution}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <section className="p-4 flex flex-col justify-center items-center w-full h-full">
      <div className="text-center pt-8">
        <h2 className="text-2xl font-bold text-red-500">
          All of the symptoms you provided did not match any disease.
        </h2>
        <p className="text-lg text-gray-500 py-3">
          Please consult a doctor immediately for a proper diagnosis and medical
          advice.
        </p>
      </div>

      <button type="button" className="px-16" onClick={() => location.reload()}>
        Reset
      </button>
    </section>
  );
};

export default Diseases;
