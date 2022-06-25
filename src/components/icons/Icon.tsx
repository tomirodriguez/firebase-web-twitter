import { FC } from 'react';

type Props = {
  icon: IconPath;
  size?: number;
  color?: string;
  filled?: boolean;
};

const Icon: FC<Props> = ({
  size = 26,
  color = '#E7E9EA',
  filled = true,
  icon,
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
    <g>
      <path d={icon.path} />
    </g>
  </svg>
);

export default Icon;
