'use client';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { cardClasses } from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';
import { _coursesContinue, _coursesFeatured, _coursesReminder } from 'src/_mock';

import { CourseProgress } from '../course-progress';
import { CourseContinue } from '../course-continue';
import { CourseFeatured } from '../course-featured';
import { CourseReminders } from '../course-reminders';
import { CourseMyAccount } from '../course-my-account';
import { CourseHoursSpent } from '../course-hours-spent';
import { CourseMyStrength } from '../course-my-strength';
import { CourseWidgetSummary } from '../course-widget-summary';
import { buildCSRFHeaders, listCourses } from 'src/lib/ash_rpc';
import useSWR from 'swr';

// ----------------------------------------------------------------------
async function fetchCourses() {
  const result = await listCourses({
    fields: ["id", "title", "description", "imageUrl", "teacherId"],
    page: {limit: 10, offset: 1  }, 
    headers: buildCSRFHeaders()
  });

  if (!result.success) {
    throw new Error(result.errors[0]?.message || "Failed to fetch courses");
  }
  // Add artificial delay for demo purposes
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log('Fetched courses:', result.data);
  return result;
}


export function OverviewCourseView() {
  const { data, error, isLoading } = useSWR('courses', fetchCourses);
  if (isLoading) {
    return <Box sx={{ pt: 5, pb: 10, px: { xs: 2, md: 3 } }}>Loading courses...</Box>;
  }

  if (error) {
    return <Box sx={{ pt: 5, pb: 10, px: { xs: 2, md: 3 } }}>Error loading courses: {error.message}</Box>;
  }

  const courses = data;
  console.log('Courses data:', courses, error, isLoading);
  // console.log('Debugging:', { 
  //   hasData: !!data, 
  //   hasResults: !!data?.results, 
  //   resultsLength: data?.results?.length,
  //   firstResult: data?.results?.[0],
  //   dataType: typeof data,
  //   isArray: Array.isArray(data),
  //   dataKeys: data ? Object.keys(data) : [],
  //   actualData: data
  // });

  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={[
        (theme) => ({
          borderTop: { lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}` },
        }),
      ]}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box
          sx={[
            (theme) => ({
              gap: 3,
              display: 'flex',
              minWidth: { lg: 0 },
              py: { lg: 3, xl: 5 },
              flexDirection: 'column',
              flex: { lg: '1 1 auto' },
              px: { xs: 2, sm: 3, xl: 5 },
              borderRight: {
                lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
              },
            }),
          ]}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
             欢迎学习 👋
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >{`课程学习计划`}</Typography>
          </Box>

          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            <CourseWidgetSummary
              title="学习的课程"
              total={1}
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
            />

            <CourseWidgetSummary
              title="完成的课程"
              total={1}
              color="success"
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-completed.svg`}
            />

            <CourseWidgetSummary
              title="参与的课程图谱"
              total={1}
              color="secondary"
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg`}
            />
          </Box>

          <CourseHoursSpent
            title="时间花费"
            chart={{
              series: [
                {
                  name: '周',
                  categories: ['第一周', '第二周', '第三周', '第四周', '第五周'],
                  data: [{ data: [10, 41, 35, 151, 49] }],
                },
                {
                  name: 'Monthly',
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  data: [{ data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
                },
                {
                  name: 'Yearly',
                  categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                  data: [{ data: [24, 72, 64, 96, 76, 41] }],
                },
              ],
            }}
          />

          <Box
            sx={{
              gap: 3,
              display: 'grid',
              alignItems: 'flex-start',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            }}
          >
            <CourseProgress
              title="课程进度"
              chart={{
                series: [
                  { label: 'To start', value: 45 },
                  { label: 'In progress', value: 25 },
                  { label: 'Completed', value: 20 },
                ],
              }}
            />

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
              {data?.data && data?.data?.results?.map((c) => (<div key={c.id}>{c.title}</div>))  }
              <div>{data?.data?.results.length || 0}</div> 
              <CourseContinue title="学习课程" list={data?.data?.results || []} />
              </>
            )}
          </Box>

          {/* <CourseFeatured title="特色课程" list={courses} /> */}
        </Box>

        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'column',
            px: { xs: 2, sm: 3, xl: 5 },
            pt: { lg: 8, xl: 10 },
            pb: { xs: 8, xl: 10 },
            flexShrink: { lg: 0 },
            gap: { xs: 3, lg: 5, xl: 8 },
            maxWidth: { lg: 320, xl: 360 },
            bgcolor: { lg: 'background.neutral' },
            [`& .${cardClasses.root}`]: {
              p: { xs: 3, lg: 0 },
              boxShadow: { lg: 'none' },
              bgcolor: { lg: 'transparent' },
            },
          }}
        >
          <CourseMyAccount />

          <CourseMyStrength
            title="学生能力"
            chart={{
              categories: ['能力1', '能力2', '能力3', '能力4', '能力5', '能力6'],
              series: [{ data: [80, 50, 30, 40, 100, 20] }],
            }}
          />

          <CourseReminders title="课程计划" list={_coursesReminder} />
        </Box>
      </Box>
    </DashboardContent>
  );
}
