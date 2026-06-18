import axios from 'axios';

// Placeholder for the Affordmed API endpoint
const AFFORDMED_API_BASE = process.env.REACT_APP_AFFORDMED_API_URL || 'https://api.affordmed.com/notifications';

export const retrieveNotifications = async () => {
  try {
    const { data } = await axios.get(AFFORDMED_API_BASE);
    return data;
  } catch (err) {
    console.warn('Failed to retrieve notifications from Affordmed API, using fallback data:', err);
    // Fallback mock data if API is not accessible so UI can still be tested
    return [
      { id: 1, title: 'Campus Placement Drive', type: 'Placement', date: new Date().toISOString(), message: 'TCS is visiting tomorrow.' },
      { id: 2, title: 'Semester 6 Results', type: 'Result', date: new Date(Date.now() - 86400000).toISOString(), message: 'Results are out on the portal.' },
      { id: 3, title: 'Tech Symposium 2026', type: 'Event', date: new Date(Date.now() - 172800000).toISOString(), message: 'Annual tech fest registrations open.' },
      { id: 4, title: 'Amazon Internship', type: 'Placement', date: new Date(Date.now() - 3600000).toISOString(), message: 'Apply for Amazon SDE intern.' },
      { id: 5, title: 'Mid-term Scores', type: 'Result', date: new Date(Date.now() - 5000000).toISOString(), message: 'Check your mid-term scores.' },
      { id: 6, title: 'Alumni Meetup', type: 'Event', date: new Date(Date.now() - 25000000).toISOString(), message: 'Join the alumni network gathering.' },
    ];
  }
};
