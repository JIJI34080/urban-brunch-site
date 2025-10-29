import AdminPanel from '@/components/admin-panel';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">URBAN BRUNCH · Admin</h1>
      <p className="mt-2 text-brand/70">Modifier les contenus JSON et synchroniser instantanément vos pages multilingues.</p>
      <div className="mt-8">
        <AdminPanel />
      </div>
    </div>
  );
}
