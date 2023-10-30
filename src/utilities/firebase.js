import { initializeApp } from "firebase/app";
import { useEffect, useState, useCallback } from "react";
import {
  getDatabase,
  onValue,
  ref,
  update,
  connectDatabaseEmulator,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCS0fx98HtStiYYtV7V87eQW2jCcCNfjG8",
  authDomain: "studybuddy-79445.firebaseapp.com",
  projectId: "studybuddy-79445",
  storageBucket: "studybuddy-79445.appspot.com",
  messagingSenderId: "574789157411",
  appId: "1:574789157411:web:c6b82d8b9ce7370de7e796"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// const auth = getAuth(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};