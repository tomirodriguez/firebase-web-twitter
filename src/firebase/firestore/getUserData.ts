import { getDoc, doc, DocumentReference } from 'firebase/firestore';
import { CustomError } from '../../utils';
import { firestore } from '../firebaseConfig';

export const getUserData = async (id: string): Promise<User> => {
  const docRef = doc(
    firestore,
    'users',
    id
  ) as DocumentReference<FirestoreUser>;
  const docSnap = await getDoc<FirestoreUser>(docRef);

  if (!docSnap.exists())
    throw new CustomError({
      code: 'user_doesnt_exist',
      message: 'Usuario no encontrado.',
    });

  return { ...docSnap.data(), id };
};
