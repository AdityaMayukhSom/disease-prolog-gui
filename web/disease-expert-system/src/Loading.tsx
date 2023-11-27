import { useEffect, useState } from "react";

const LoadingBar: React.FC<{ width: number }> = ({ width = 100 }) => {
  const barStyle = {
    width: width > 100 ? "100%" : `${width}%`,
  };

  return (
    <div
      className="bg-gray-200 h-6 md:h-8 rounded-full dark:bg-gray-700  my-3"
      style={barStyle}
    />
  );
};

export default function Loading() {
  const [fields, setFields] = useState<JSX.Element[]>([]);

  useEffect(() => {
    for (let i = 1; i <= 10; i++) {
      fields.push(<LoadingBar key={i} width={60 + Math.random() * 40} />);
    }

    setFields((fields) => [...fields]);
  }, []);
  return (
    <section className="w-full flex flex-col items-center justify-center pt-8">
      <h1 className="font-semibold text-4xl text-gray-300 py-6">Loading...</h1>
      <div role="status" className="w-3/4 md:w-1/2 animate-pulse">
        {fields}
      </div>
    </section>
  );
}
