import { FC } from 'react';
import Icon from '.';
import { iLogo } from './Icons';

type Props = {
  size?: number | string;
  color?: string;
  filled?: boolean;
};

export const Logo: FC<Props> = ({
  size = 26,
  color = '#E7E9EA',
  filled = true,
}) => <Icon icon={iLogo} size={size} color={color} filled={filled} />;
