import axios from 'axios';

export const fetchStudentByUsername = async (username: string) => {
  if (!username) return;
  return axios.get(`/api/students/${username}`).then((res) => res.data.student);
};
