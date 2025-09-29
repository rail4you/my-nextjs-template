import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import CourseOverviewView from 'src/sections/teacher/view/teacher-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Teacher | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <TeacherView />;
}