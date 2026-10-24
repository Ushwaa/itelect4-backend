import { Router } from 'express';
import { Course } from '../models/Course';

const courseRouter = Router();

courseRouter.get('/', async (_req, res) => {
  try {
    const courses = await Course.find({}).sort({ code: 1 });

    res.status(200).json(
      courses.map((course) => ({
        code: course.code,
        title: course.title,
        units: course.units,
        semester: course.semester,
      }))
    );
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Unable to fetch courses.' });
  }
});

courseRouter.get('/:code', async (req, res) => {
  try {
    const code = String(req.params.code ?? '').trim().toUpperCase();

    if (!code) {
      res.status(400).json({ message: 'Course code is required.' });
      return;
    }

    const course = await Course.findOne({ code });

    if (!course) {
      res.status(404).json({ message: `Course ${code} was not found.` });
      return;
    }

    res.status(200).json({
      code: course.code,
      title: course.title,
      units: course.units,
      semester: course.semester,
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Unable to fetch course.' });
  }
});

export default courseRouter;
