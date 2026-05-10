'use client';

import { Suspense } from 'react';
import ListItemPage from '@/features/listings/ListItemPage';

export default function ListItem() {
  return (
    <Suspense fallback={null}>
      <ListItemPage />
    </Suspense>
  );
}
