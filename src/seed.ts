import dotenv from 'dotenv';
import { connectDB, disconnectDB } from './config/db';
import { Course } from './models/Course';
import { courseSeedRecords } from './data/courses';

dotenv.config();

async function seedCourses(): Promise<void> {
  await connectDB();

  for (const course of courseSeedRecords) {
    await Course.findOneAndUpdate(
      { code: course.code },
      {
        $set: {
          code: course.code.trim().toUpperCase(),
          title: course.title.trim(),
          units: Number(course.units),
          semester: course.semester.trim(),
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  console.log('Course seed complete.');
}

seedCourses()
  .catch((error) => {
    console.error('Course seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDB();
  });
