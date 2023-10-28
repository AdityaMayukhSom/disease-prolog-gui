const Diseases = ({ diseases }: { diseases: string[] }) => {
  return diseases.length ? (
    <div>
      <h3>possible diseases:</h3>
      <ul className="card">
        {diseases.map((d) => (
          <li key={d} className="disease">
            {d}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h3>good luck. we don&apos;t know what&apos;s wrong with you.</h3>
  );
};

export default Diseases;
