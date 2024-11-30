import { useState, useEffect } from 'react';

interface Announcement {
  title: string;
  content: string;
  createdAt: string;
  author: string;
  link?: string;
  image?: string;
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:3001/announcements');
        const data = await response.json();
        setAnnouncements(data);
      } catch (err) {
        setError('Failed to fetch announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return { announcements, loading, error };
}; 