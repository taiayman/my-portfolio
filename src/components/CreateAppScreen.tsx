import React from 'react';

const CreateAppScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-white">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg">
        Create Your App
      </button>
    </div>
  );
};

export default CreateAppScreen;
