import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useIsCurrentSection = (pathName: string) => {
  const { pathname: currentPathName } = useLocation();
  const [isCurrentSection, setIsCurrentSection] = useState(
    currentPathName === pathName
  );

  useEffect(() => {
    setIsCurrentSection(currentPathName === pathName);
  }, [currentPathName, pathName]);

  return isCurrentSection;
};
