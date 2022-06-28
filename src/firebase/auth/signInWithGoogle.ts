import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CustomError } from '../../utils/CustomError';
import { auth } from '../firebaseConfig';

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider).then(async (result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential)
      throw new CustomError({
        code: 'missing_credential',
        message: "Couldn't found credentials",
      });
  });
};
