import React from "react";

const PredictionButton = () => {
  const handlePrediction = async () => {
    try {
      const response = await fetch('http://localhost:6007/train_model_predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Prediction: ", data.predictions[0]);
      } else {
        console.error("Failed to fetch prediction. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handlePrediction}
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
      >
        Get Prediction
      </button>
    </div>
  );
};

export default PredictionButton;