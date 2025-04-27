import React, { useEffect, useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './routes/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice';
import BikeLoader from './shared/loader/BikeLoader';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth({
          isAuthenticated: true,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        }));
      } else {
        dispatch(setAuth({
          isAuthenticated: false,
          user: null,
        }));
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <BikeLoader/>
  }

  return (
    <div className='wrapper'>
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;












