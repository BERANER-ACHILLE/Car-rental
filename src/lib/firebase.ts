import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXx3ooxLU-OjCvfhLiU2vFe0UDimfc3lw",
  authDomain: "youthful-zenith-446tg.firebaseapp.com",
  projectId: "youthful-zenith-446tg",
  storageBucket: "youthful-zenith-446tg.firebasestorage.app",
  messagingSenderId: "657795180612",
  appId: "1:657795180612:web:2189d34ddebd1b86973411"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore targeting the custom Database ID created for this applet
export const db = getFirestore(app, "ai-studio-flexirentrw-21bd6f6c-c0df-433d-80d9-1eb67d082746");

export const auth = getAuth(app);

// Critical constraint: Connection validation on initialization
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
