import { useProgress } from '@/contexts/ProgressContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, RotateCcw, TrendingUp, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (completed: number, total: number) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    name: 'First Step',
    description: 'Complete your first week',
    icon: '🎯',
    condition: (completed) => completed >= 1,
  },
  {
    id: 'quarter_way',
    name: 'Quarter Way There',
    description: 'Complete 25% of the roadmap',
    icon: '🚀',
    condition: (completed, total) => completed >= Math.ceil(total * 0.25),
  },
  {
    id: 'halfway',
    name: 'Halfway Hero',
    description: 'Complete 50% of the roadmap',
    icon: '⭐',
    condition: (completed, total) => completed >= Math.ceil(total * 0.5),
  },
  {
    id: 'three_quarter',
    name: 'Three Quarter Master',
    description: 'Complete 75% of the roadmap',
    icon: '💎',
    condition: (completed, total) => completed >= Math.ceil(total * 0.75),
  },
  {
    id: 'month1_complete',
    name: 'Month 1 Master',
    description: 'Complete all of Month 1 (HTML & CSS)',
    icon: '🎨',
    condition: (completed, total) => [1, 2, 3, 4].every((w) => {
      // This will be checked differently in the component
      return true;
    }),
  },
  {
    id: 'month2_complete',
    name: 'JavaScript Ninja',
    description: 'Complete all of Month 2 (JavaScript)',
    icon: '⚡',
    condition: (completed, total) => [5, 6, 7, 8].every((w) => {
      return true;
    }),
  },
  {
    id: 'month3_complete',
    name: 'App Developer',
    description: 'Complete all of Month 3 (React/Flutter)',
    icon: '📱',
    condition: (completed, total) => [9, 10, 11, 12].every((w) => {
      return true;
    }),
  },
  {
    id: 'month4_complete',
    name: '3D Artist',
    description: 'Complete all of Month 4 (Blender)',
    icon: '🎬',
    condition: (completed, total) => [13, 14, 15, 16].every((w) => {
      return true;
    }),
  },
  {
    id: 'all_complete',
    name: 'Master Developer',
    description: 'Complete all 16 weeks!',
    icon: '👑',
    condition: (completed, total) => completed === total,
  },
];

export function ProgressDashboard() {
  const { getProgressPercentage, getCompletedCount, getTotalWeeks, getMonthProgress, resetProgress, progress } = useProgress();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const completed = getCompletedCount();
  const total = getTotalWeeks();
  const percentage = getProgressPercentage();

  // Check achievements
  useEffect(() => {
    const unlocked: string[] = [];

    // Check percentage-based achievements
    ACHIEVEMENTS.forEach((achievement) => {
      if (achievement.condition(completed, total)) {
        unlocked.push(achievement.id);
      }
    });

    // Check month-specific achievements
    const month1Progress = getMonthProgress(1);
    if (month1Progress.completed === month1Progress.total) {
      unlocked.push('month1_complete');
    }

    const month2Progress = getMonthProgress(2);
    if (month2Progress.completed === month2Progress.total) {
      unlocked.push('month2_complete');
    }

    const month3Progress = getMonthProgress(3);
    if (month3Progress.completed === month3Progress.total) {
      unlocked.push('month3_complete');
    }

    const month4Progress = getMonthProgress(4);
    if (month4Progress.completed === month4Progress.total) {
      unlocked.push('month4_complete');
    }

    setUnlockedAchievements(Array.from(new Set(unlocked)));
  }, [completed, total, getMonthProgress]);

  const startDate = new Date(progress.startDate);
  const daysActive = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">{percentage}%</div>
              <Progress value={percentage} className="h-2" />
              <p className="text-xs text-slate-500">{completed} of {total} weeks completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Weeks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">{completed}</div>
              <p className="text-xs text-slate-500">Keep up the momentum!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Days Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">{daysActive}</div>
              <p className="text-xs text-slate-500">Since you started</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">{unlockedAchievements.length}</div>
              <p className="text-xs text-slate-500">of {ACHIEVEMENTS.length} unlocked</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Monthly Progress
          </CardTitle>
          <CardDescription>Track your progress through each month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((month) => {
              const monthProgress = getMonthProgress(month);
              const monthNames = ['Month 1: HTML & CSS', 'Month 2: JavaScript', 'Month 3: React/Flutter', 'Month 4: Blender'];
              return (
                <div key={month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">{monthNames[month - 1]}</span>
                    <span className="text-xs font-bold text-blue-400">{monthProgress.percentage}%</span>
                  </div>
                  <Progress value={monthProgress.percentage} className="h-2" />
                  <p className="text-xs text-slate-500">{monthProgress.completed}/{monthProgress.total} weeks</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Achievements
          </CardTitle>
          <CardDescription>Unlock achievements as you progress through the roadmap</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((achievement) => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 border-yellow-500/50'
                      : 'bg-slate-800 border-slate-700 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className={`text-sm font-semibold ${isUnlocked ? 'text-yellow-300' : 'text-slate-400'}`}>
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-slate-500">{achievement.description}</p>
                  {isUnlocked && <div className="mt-2 text-xs text-yellow-400 font-medium">✓ Unlocked</div>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="border-slate-600 text-slate-200 hover:bg-slate-800 flex-1"
          onClick={() => setShowResetConfirm(true)}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Progress
        </Button>
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
            <Card className="bg-slate-900 border-slate-700 w-96">
              <CardHeader>
                <CardTitle className="text-white">Reset Progress?</CardTitle>
                <CardDescription>This will clear all your completed weeks and cannot be undone.</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-600"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    resetProgress();
                    setShowResetConfirm(false);
                  }}
                >
                  Reset
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
