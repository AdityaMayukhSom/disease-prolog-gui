import { useEffect, useState } from "react";

const LoadingBar: React.FC<{ height: number; width: number }> = ({
  height = 2,
  width = 100,
}) => {
  const barStyle = {
    height: `${height}rem`,
    width: width > 100 ? "100%" : `${width}%`,
  };

  return (
    <div
      className="bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] my-3"
      style={barStyle}
    />
  );
};

export default function Loading() {
  const [fields, setFields] = useState<JSX.Element[]>([]);

  useEffect(() => {
    for (let i = 1; i <= 10; i++) {
      fields.push(
        <LoadingBar key={i} height={1.8} width={60 + Math.random() * 40} />
      );
    }

    setFields((fields) => [...fields]);
  }, []);
  return (
    <section className="w-full flex items-center">
      <div role="status" className="w-96 animate-pulse">
        {fields}
      </div>
    </section>
  );
}
