'use client';

import { Suspense } from 'react';
import ListItemPage from '@/pages/ListItem';

export default function ListItem() {
  return (
    <Suspense fallback={null}>
      <ListItemPage />
    </Suspense>
  );
}
