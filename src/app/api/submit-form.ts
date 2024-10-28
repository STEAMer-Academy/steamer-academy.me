import { NextApiRequest, NextApiResponse } from 'next';

const DATA_API_URL = 'https://www.steameracademy.me';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { formType, ...formData } = req.body;

      let endpoint;
      if (formType === 'contact') {
        endpoint = '/data-api/rest/ContactSubmissions';
      } else if (formType === 'newsletter') {
        endpoint = '/data-api/rest/NewsletterSubscriptions';
      } else {
        throw new Error('Invalid form type');
      }

      const response = await fetch(`${DATA_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed: ${errorData.message || response.statusText}`);
      }

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Error submitting form', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
