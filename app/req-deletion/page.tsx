'use client'
import { useState } from 'react';

export default function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-medium mb-2">
              Your account deletion request has been received.
            </p>
            <p className="text-blue-700 text-sm">
              Email: <span className="font-mono">{email}</span>
            </p>
          </div>

          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What happens next:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Your account and all associated data will be permanently deleted within <strong>30 days</strong>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                This includes your profile, preferences, app data, and usage history
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                You will receive a confirmation email once deletion is complete
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                This action cannot be undone
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Delete Your Account</h2>
          <p className="text-gray-600 text-sm">
            Request permanent deletion of your Deitify account and all associated data
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-yellow-800 font-medium text-sm">Warning</p>
              <p className="text-yellow-700 text-xs mt-1">
                This action is permanent and cannot be undone. All your data will be deleted within 30 days.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your account email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && email) {
                  handleSubmit(e);
                }
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the email address associated with your Deitify account
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Data to be deleted:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Account profile and settings</li>
              <li>• App preferences and customizations</li>
              <li>• Usage history and analytics</li>
              <li>• All personal data stored in Deitify</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              <strong>Retention period:</strong> Data will be permanently deleted within 30 days of this request.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!email || isLoading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Delete My Account'
            )}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Need help? Contact us at{' '}
            <a href="mailto:teamdietify@gmail.com" className="text-blue-600 hover:text-blue-700">
              teamdietify@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}