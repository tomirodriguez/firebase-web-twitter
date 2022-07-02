import { getDoc } from 'firebase/firestore';
import { getRef } from '.';

export const getDocument = async <T>(collectionId: string, id: string) => {
  const docRef = getRef<T>(collectionId, id);

  return getDoc(docRef);
};
