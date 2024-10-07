import { useEffect } from 'react';

const CaptchaV2: React.FC = () => {
  useEffect(() => {
    // Load the reCAPTCHA script after the component is mounted
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div
        className="g-recaptcha"
        data-sitekey="6Lc7R1oqAAAAAJuvexCVE_m4Vo5pLlwWj6D7xnPL" 
      ></div>
    </div>
  );
};

export default CaptchaV2;

