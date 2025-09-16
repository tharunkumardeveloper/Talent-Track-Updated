import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VideoAnalysisModal } from '../components/VideoAnalysisModal';

export default function VideoAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { videoFile, activityName } = location.state || {};

  const handleClose = () => {
    navigate('/assessment');
  };

  return (
    <VideoAnalysisModal
      isOpen={true}
      onClose={handleClose}
      videoFile={videoFile}
      activityName={activityName}
    />
  );
}