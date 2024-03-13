import axios from 'axios';

export const fetchStudentByUsername = async (username: string) =>
  axios.get(`/api/students/${username}`).then((res) => res.data.student);
