import { NextResponse } from 'next/server';
import { AssignmentResponse } from '@/models/assignmentResponse';
import { Course } from '@/models/course';
import { Student } from '@/models/student';

const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as {
      gitHubUsernames: string[];
      courseSlug: string;
    };
    const { gitHubUsernames, courseSlug } = body;

    try {
      const course = await Course.findOne({ slug: courseSlug });
      if (!course) {
        return NextResponse.json(
          {
            message: 'Course not found',
          },
          {
            status: 404,
          },
        );
      }

      const arrayOfGitHubUsernamesObj = gitHubUsernames.map((username) => ({
        username,
        invalidUsername: true,
      }));

      const studentsByUsername = await Student.find({
        username: { $in: gitHubUsernames },
      }).select('username');

      for (const student of studentsByUsername) {
        const existingStudent = arrayOfGitHubUsernamesObj.find(
          (user) => user.username === student.username,
        );
        if (existingStudent) {
          existingStudent.invalidUsername = false;
        }
      }

      interface StudentScores {
        [username: string]: number;
      }

      const scores: StudentScores = {};

      for (const student of studentsByUsername) {
        const assignmentResponses = await AssignmentResponse.find({
          course: course._id,
          student: student._id,
        });

        scores[student.username] = assignmentResponses.reduce(
          (acc, assignment) => acc + assignment.score,
          0,
        );
      }

      const mapStudentToResult = arrayOfGitHubUsernamesObj.map((user) => ({
        ...user,
        score: scores[user.username] || 0,
      }));

      return NextResponse.json(
        {
          message: `Result for course "${courseSlug}" fetched`,
          extractedStudentResult: mapStudentToResult,
        },
        {
          status: 200,
        },
      );
    } catch (error) {
      console.error('Error fetching user scores:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { POST };
