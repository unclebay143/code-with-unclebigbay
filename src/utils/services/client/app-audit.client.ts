import axios from 'axios';

export const logAppEvent = async (eventPayload: {
  event_name: string;
  student?: string;
  event_properties?: {};
}) => {
  return axios.post('/api/app-events', eventPayload).then((res) => res.data);
};
