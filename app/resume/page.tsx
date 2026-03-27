
import React from 'react';

const RESUME_EMBED_URL = "https://drive.google.com/file/d/1fGSpqQ_NLIMY-fd879HgINXnoUIKzoYX/preview";

const ResumePage = () => {
  return (
    <div className="w-full h-screen"> 
      <iframe
        src={RESUME_EMBED_URL}
        title="Mohnish Gorana Resume"
        className="w-full h-full border-0" 
        style={{ minHeight: '100vh' }} // Ensure it takes full viewport height
        allowFullScreen
      >
        <p>Your browser does not support iframes, but you can download the resume <a href={RESUME_EMBED_URL}>here</a>.</p>
      </iframe>
    </div>
  );
};

export default ResumePage;