import { NextResponse } from 'next/server';
import { AssignmentResponse } from '@/models/assignmentResponse';
import { Course } from '@/models/course';
import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';

const POST = async (req: Request) => {
  try {
    await connectViaMongoose();
    const body = (await req.json()) as {
      userNames: string[];
      courseSlug: string;
    };
    const { userNames, courseSlug } = body;

    try {
      const course = await Course.findOne({ slug: courseSlug }).select(
        '_id title',
      );

      console.log(course.title);

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

      const arrayOfuserNamesObj = userNames.map((username) => ({
        username,
        invalidUsername: true,
      }));

      console.log(userNames);

      const studentsByUsername = await Student.find({
        username: { $in: userNames },
      }).select('username');

      for (const student of studentsByUsername) {
        const existingStudent = arrayOfuserNamesObj.find(
          (user) => user.username === student.username,
        );
        if (existingStudent) {
          existingStudent.invalidUsername = false;
        }
      }

      interface StudentScores {
        [username: string]: number;
      }

      let scores: StudentScores = {};
      let total: number = 0;

      for (const student of studentsByUsername) {
        const assignmentResponses = await AssignmentResponse.find({
          course: course._id,
          student: student._id,
        });

        if (!total) {
          total = assignmentResponses?.[0].response.length;
        }

        scores[student.username] = assignmentResponses.reduce(
          (acc, assignment) => acc + assignment.score,
          0,
        );
      }

      const mapStudentToResult = arrayOfuserNamesObj.map((user) => ({
        ...user,
        score: scores[user.username] || 0,
        total,
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
      return NextResponse.json(
        { message: 'Error fetching user scores' },
        { status: 500 },
      );
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { POST };
