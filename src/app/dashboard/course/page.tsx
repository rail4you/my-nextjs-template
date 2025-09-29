import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import CourseDataView from 'src/sections/course/view/course-data-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Teacher | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CourseDataView />;
}