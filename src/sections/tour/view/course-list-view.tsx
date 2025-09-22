'use client';

import useSWR from "swr";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { buildCSRFHeaders, listCourses } from "src/lib/ash_rpc";
import { CourseItem } from "../course-item";

async function fetchCourses() {
  const result = await listCourses({
    fields: ["id", "title", "description", "imageUrl", "teacherId"],
    headers: buildCSRFHeaders()
  });

  if (!result.success) {
    throw new Error(result.errors[0]?.message || "Failed to fetch courses");
  }

  return result.data;
}

export function CourseListView() {
  const { data: courses, error, isLoading } = useSWR('courses', fetchCourses);
  console.log('Courses data:', courses, error, isLoading);
  if (isLoading) {
    return <Box sx={{ pt: 5, pb: 10, px: { xs: 2, md: 3 } }}>Loading courses...</Box>;
  }

  if (error) {
    return <Box sx={{ pt: 5, pb: 10, px: { xs: 2, md: 3 } }}>Error loading courses: {error.message}</Box>;
  }

  return (
    <Box sx={{ pt: 5, pb: 10, px: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {courses?.results?.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
          />
        ))}
      </Box>

      {courses?.results && courses.results.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 5,
            mb: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      )}
    </Box>
  )

}
