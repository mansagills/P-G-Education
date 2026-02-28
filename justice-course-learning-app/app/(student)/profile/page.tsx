import { requireStudentAccess } from '@/components/layout/RouteGuard';
import { BadgePill } from '@/components/ui/BadgePill';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getLevelFromXp, LEVEL_THRESHOLDS } from '@/lib/xp/rules';

export default async function ProfilePage() {
  const user = await requireStudentAccess();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  const { data: xpRows } = await supabase.from('xp_transactions').select('xp_amount').eq('user_id', user.id);
  const totalXp = (xpRows ?? []).reduce((sum, row) => sum + row.xp_amount, 0);
  const level = getLevelFromXp(totalXp);

  const { data: achievements } = await supabase
    .from('user_achievements')
    .select('achievements(title, description)')
    .eq('user_id', user.id)
    .order('awarded_at', { ascending: false });

  return (
    <section className="space-y-6">
      <header className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-600">{profile?.display_name ?? user.email}</p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">XP and Level</h2>
        <p className="mt-2 text-sm text-slate-700">Total XP: {totalXp}</p>
        <p className="text-sm text-slate-700">Current Level: {level}</p>
        <p className="mt-3 text-xs text-slate-500">
          Levels: {LEVEL_THRESHOLDS.map((threshold) => `L${threshold.level} (${threshold.minXp})`).join(' • ')}
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Achievements</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(achievements ?? []).length === 0 ? <p className="text-sm text-slate-600">No achievements yet.</p> : null}
          {(achievements ?? []).map((entry, index) => {
            const achievement = Array.isArray(entry.achievements) ? entry.achievements[0] : entry.achievements;
            return <BadgePill key={index} label={achievement?.title ?? 'Achievement'} />;
          })}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Certificates</h2>
        <p className="text-sm text-slate-600">Certificate downloads are planned for a future phase.</p>
      </section>
    </section>
  );
}
