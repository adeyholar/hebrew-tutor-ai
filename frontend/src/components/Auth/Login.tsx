// frontend/src/components/Auth/Login.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Correct import: using the compatible react-audio-voice-recorder
import { AudioRecorder } from 'react-audio-voice-recorder';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // New state to store the recorded audio URL for playback
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password }).toString(),
      });
      if (response.ok) {
        const { access_token } = await response.json();
        localStorage.setItem('token', access_token);
        // Consider using React Router for navigation instead of window.location.href
        window.location.href = '/lesson';
      } else {
        setError(t('auth.login_failed'));
      }
    } catch (err) {
      setError(t('auth.network_error'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto dir-ltr">
      <h2 className="text-2xl font-bold mb-4">{t('auth.login')}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder={t('auth.email')}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder={t('auth.password')}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full mb-2">
          {t('auth.login')}
        </button>

        {/* Integrated AudioRecorder component */}
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Record Pronunciation</h3>
          <AudioRecorder
            onRecordingComplete={(blob: Blob) => { // Added type 'Blob'
              // Create a URL for the recorded audio blob
              const url = URL.createObjectURL(blob);
              setRecordedAudioUrl(url); // Store the URL in state
              console.log("Recorded audio blob URL:", url);
              // You can now send 'blob' to your backend or process it
            }}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            // Handle cases where microphone access is denied or not found
            onNotAllowedOrFound={(err: Error) => { // Added type 'Error'
              console.error(`Microphone error: ${err.name}: ${err.message}`);
              // You might want to add a specific translation key for microphone error
              setError(t('auth.microphone_error') || 'Microphone access denied or not found.');
            }}
            downloadFileExtension="webm" // Recommended format for web recording
            showVisualizer={true} // Show the audio visualizer during recording
          />
          {/* Display the audio player if a recording exists */}
          {recordedAudioUrl && (
            <div className="mt-4">
              <h4 className="text-md font-medium mb-2">Play Recording:</h4>
              <audio src={recordedAudioUrl} controls className="w-full" />
              {/* Optional: Add a button to clear the recording */}
              <button
                onClick={() => setRecordedAudioUrl(null)}
                className="mt-2 bg-gray-300 text-gray-800 p-1 rounded text-sm"
              >
                Clear Recording
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;