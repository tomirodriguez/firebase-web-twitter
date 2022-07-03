import { FC } from 'react';

type Props = {
  size?: number;
};

export const Spinner: FC<Props> = ({ size = 20 }) => {
  return (
    <div
      className="custom-loader"
      role={'spinbutton'}
      style={{ width: size, height: size }}
    ></div>
  );
};
