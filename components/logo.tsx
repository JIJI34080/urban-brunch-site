import Link from 'next/link';

export default function Logo({ locale }: { locale: string }) {
  return (
    <Link href={`/${locale}`} className="font-display text-xl font-bold tracking-tight">
      <span className="text-terracotta">URBAN</span> BRUNCH
    </Link>
  );
}
