import Disease from "./Disease";

const Diseases = ({ diseases }: { diseases: Disease[] }) => {
  return diseases.length ? (
    <div className="max-w-3xl py-5">
      <h3 className="text-2xl font-bold text-white ">Possible Diseases:</h3>

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
    </div>
  ) : (
    <h3>good luck. we don&apos;t know what&apos;s wrong with you.</h3>
  );
};

export default Diseases;
