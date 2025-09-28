import { Metadata } from "next";
import GptView from "src/sections/gpt/view/gpt-view";
import { CONFIG } from 'src/global-config';

export const metadata: Metadata = { title: `GptCaht | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <GptView />;
}
