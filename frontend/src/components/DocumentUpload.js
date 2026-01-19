import React from 'react';
import { FaCheckCircle, FaCamera, FaImage } from 'react-icons/fa';

const DocumentUpload = ({ documentType, label, onFileSelect, isUploaded, isLoading }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <label className="text-base font-semibold text-gray-800">{label}</label>
        {isUploaded && <FaCheckCircle className="text-green-500 text-xl" />}
      </div>

      <div className="flex gap-2">
        <label className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading || isUploaded}
            className="hidden"
          />
          <div className={`p-3 rounded-lg border-2 border-dashed text-center cursor-pointer transition ${
            isUploaded 
              ? 'border-green-300 bg-green-50' 
              : 'border-blue-300 bg-blue-50 hover:border-blue-400'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="flex items-center justify-center gap-2">
              {isUploaded ? (
                <>
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-green-700 font-medium">✅ Anexado</span>
                </>
              ) : (
                <>
                  <FaImage className="text-blue-500" />
                  <span className="text-blue-700 font-medium">{isLoading ? 'Enviando...' : 'Selecionar foto'}</span>
                </>
              )}
            </div>
          </div>
        </label>

        {!isUploaded && (
          <button
            type="button"
            onClick={() => document.querySelector(`input[data-type="${documentType}"]`)?.click()}
            disabled={isLoading}
            className="px-3 py-2 bg-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-300 disabled:opacity-50"
          >
            <FaCamera />
          </button>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        data-type={documentType}
        onChange={handleFileChange}
        disabled={isLoading || isUploaded}
        className="hidden"
      />
    </div>
  );
};

export default DocumentUpload;
