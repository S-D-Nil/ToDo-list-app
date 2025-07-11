// src/components/auth-form.tsx
"use client";

import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
  isVisible: boolean;
  onAuthSuccess: () => void; // Callback to hide the form on success
}

const AuthForm: React.FC<AuthFormProps> = ({ isVisible, onAuthSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isVisible) {
    return null; // Hide the component if not visible
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoginMode) {
      // --- Firebase Login Logic Placeholder ---
      console.log('Login Attempt:', { email, password });
      try {
        // await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful (placeholder)');
        onAuthSuccess(); // Hide the form
      } catch (error: any) {
        console.error('Login failed (placeholder):', error.message);
        // Handle login errors (e.g., display error message to user)
      }
      // --- End Firebase Login Logic Placeholder ---
    } else {
      // --- Firebase Sign Up Logic Placeholder ---
      console.log('Sign Up Attempt:', { username, email, password });
      try {
        // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Optionally, store username in Firestore after successful sign up
        // await setDoc(doc(db, "users", userCredential.user.uid), { username: username, email: email });
        console.log('Sign Up successful (placeholder)');
        onAuthSuccess(); // Hide the form
      } catch (error: any) {
        console.error('Sign Up failed (placeholder):', error.message);
        // Handle sign up errors (e.g., display error message to user)
      }
      // --- End Firebase Sign Up Logic Placeholder ---
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background overlay
        zIndex: 1000, // Ensure it's on top of other content
      }}
    >
      <div
        className="p-6 rounded shadow-md"
        style={{
          width: '300px',
          height: 'auto', // Auto height to adjust based on content
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <h2 className="text-xl text-center mb-4">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginMode && (
            <div>
              <Label htmlFor="username" style={{ color: '#fff' }}>Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLoginMode}
                style={{ backgroundColor: '#333', color: '#fff', borderColor: '#555' }}
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" style={{ color: '#fff' }}>Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: '#333', color: '#fff', borderColor: '#555' }}
            />
          </div>
          <div>
            <Label htmlFor="password" style={{ color: '#fff' }}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: '#333', color: '#fff', borderColor: '#555' }}
            />
          </div>
          <Button type="submit" className="w-full">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Button
          variant="link"
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-center text-gray-400 hover:text-gray-200"
        >
          {isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;