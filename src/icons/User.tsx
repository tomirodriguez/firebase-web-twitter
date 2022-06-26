import { FC } from 'react';

type Props = {
  size?: number;
  color?: string;
};

export const User: FC<Props> = ({ size = 48, color = '#667685' }) => {
  return (
    <div
      className="rounded-full aspect-square"
      style={{ backgroundColor: '#CCD6DD', width: size, height: size }}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
        width={size}
        fill={color}
        strokeWidth={0}
      >
        <g>
          <path d="M500,10C228.8,10,10,228.8,10,500c0,271.3,218.8,490,490,490c271.3,0,490-218.8,490-490C990,228.8,771.3,10,500,10z M804.5,822C794,657.5,619,613.8,619,613.8s106.8-71.8,68.3-217c-19.3-75.3-91-131.3-189-131.3c-98,0-169.7,56-189,131.3c-38.5,145.2,68.2,217,68.2,217S202.5,652.3,192,822C109.7,739.7,57.3,626,57.3,500C57.3,255,255,57.3,500,57.3C745,57.3,942.8,255,942.8,500C942.8,626,890.2,739.7,804.5,822z" />
        </g>
      </svg>
    </div>
  );
};
