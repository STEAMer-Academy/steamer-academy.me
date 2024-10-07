import { useEffect } from 'react';

interface CaptchaV2Props {
  onVerify: (response: string | null) => void;
}

const CaptchaV2: React.FC<CaptchaV2Props> = ({ onVerify }) => {
  useEffect(() => {
    const handleCallback = (response: string | null) => {
      onVerify(response);
    };

    // Load the reCAPTCHA script
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY"; // Replace with your site key
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize reCAPTCHA when the script is loaded
    window.onload = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('6Lc7R1oqAAAAAJuvexCVE_m4Vo5pLlwWj6D7xnPL', { action: 'submit' }).then(handleCallback);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onVerify]);

  return <div className="g-recaptcha" data-sitekey="6Lc7R1oqAAAAAJuvexCVE_m4Vo5pLlwWj6D7xnPL"></div>; // Replace with your site key
};

export default CaptchaV2;

