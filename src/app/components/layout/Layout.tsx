import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { NavProps, Page } from '../types';

interface LayoutProps extends NavProps {
  activePage: Page;
  breadcrumbs?: Array<{ label: string; page?: string }>;
  children: ReactNode;
}

export function Layout({ navigate, currentUser, logout, activePage, breadcrumbs, children }: LayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header navigate={navigate} currentUser={currentUser} logout={logout} breadcrumbs={breadcrumbs} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar navigate={navigate} currentUser={currentUser} logout={logout} active={activePage} />
        <main style={{ flex: 1, backgroundColor: '#F0F2F5', padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
