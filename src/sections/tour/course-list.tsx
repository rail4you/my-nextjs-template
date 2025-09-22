import type { ITourItem } from 'src/types/tour';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';

// import { TourItem } from './tour-item';
import { CourseItem } from './course-item';
import {SuccessDataFunc, listCourses, getCourse} from 'src/lib/ash_rpc';

// ----------------------------------------------------------------------

type Courses = SuccessDataFunc<typeof listCourses>;

type Props = {
  courses: Courses
};

export function CourseList({ courses }: Props) {
  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        courses && {courses.results.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            // editHref={paths.dashboard.tour.edit(course.id)}
            // detailsHref={paths.dashboard.tour.details(course.id)}
            // onDelete={() => handleDelete(course.id)

            // }
          />
        ))}
      </Box>

      {courses.results.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
