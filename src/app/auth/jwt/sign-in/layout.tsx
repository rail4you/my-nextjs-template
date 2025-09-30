import { AuthSplitLayout } from 'src/layouts/auth-split';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: { title: '课堂星知识图谱智慧教学系统' },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
