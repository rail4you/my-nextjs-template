import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import CourseOverviewView from 'src/sections/course/view/course-overview-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Course | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CourseOverviewView />;
}
