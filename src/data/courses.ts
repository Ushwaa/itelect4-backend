export type CourseSeedRecord = {
  code: string;
  title: string;
  units: number;
  semester: string;
};

export const courseSeedRecords: CourseSeedRecord[] = [
  {
    code: 'ITELECT4',
    title: 'IT Elective 4 - TypeScript Advanced Types',
    units: 3,
    semester: '1st Semester 2026-2027',
  },
  {
    code: 'ITELECT3',
    title: 'IT Elective 3 - Web Development',
    units: 3,
    semester: '2nd Semester 2025-2026',
  },
  {
    code: 'CSSWENG',
    title: 'Software Engineering',
    units: 3,
    semester: '1st Semester 2026-2027',
  },
];
