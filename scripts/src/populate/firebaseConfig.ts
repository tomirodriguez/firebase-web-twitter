import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'demo-local',
  authDomain: 'demo-local',
  projectId: 'demo-local',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);

connectFirestoreEmulator(firestore, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099');
