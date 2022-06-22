export const Icon: Icon = ({
  children,
  size = 26,
  color = '#E7E9EA',
  filled = true,
}) => (
  <svg
    viewBox="0 0 24 24"
    style={{
      width: size,
      stroke: color,
      strokeWidth: filled ? 0 : 1,
      fill: filled ? color : 'none',
    }}
  >
    {children}
  </svg>
);
