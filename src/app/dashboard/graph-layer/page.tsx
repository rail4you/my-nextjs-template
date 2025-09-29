import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import LayerView from 'src/sections/graph/view/layer-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Teacher | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <LayerView />;
}