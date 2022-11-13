export const getDelayStyle = (
  order: number | string
): { style: React.CSSProperties } => {
  if (typeof order !== "number") {
    return { style: {} };
  }

  const magnitude = 400;
  return { style: { "--delay": `${order * magnitude}ms` } } as {
    style: React.CSSProperties;
  };
};
