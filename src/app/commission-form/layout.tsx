import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commission Form | Jeanette S. Robison',
  description: 'Submit your portrait commission request',
};

export default function CommissionFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 