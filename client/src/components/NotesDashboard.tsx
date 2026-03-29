import { useNotes } from '@/contexts/NotesContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';

export function NotesDashboard() {
  const { getAllNotes, getNotesByMonth, exportNotesAsText, clearAllNotes } = useNotes();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const allNotes = getAllNotes();
  const totalNotes = allNotes.length;

  const handleExport = () => {
    const text = exportNotesAsText();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `learning-notes-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (totalNotes === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Notes Yet</h3>
        <p className="text-slate-400 mb-6">
          Start writing notes for each week to document your learning journey and reflections.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{totalNotes}</div>
            <p className="text-xs text-slate-500 mt-1">weeks documented</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-400 font-mono">
              {new Date(allNotes[allNotes.length - 1]?.updatedAt).toLocaleDateString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {new Date(allNotes[allNotes.length - 1]?.updatedAt).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {allNotes.reduce((sum, note) => sum + note.content.split(/\s+/).length, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">across all notes</p>
          </CardContent>
        </Card>
      </div>

      {/* Notes by Month */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Notes by Month
          </CardTitle>
          <CardDescription>View your reflections organized by learning month</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-800 border border-slate-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
                All
              </TabsTrigger>
              <TabsTrigger value="month1" className="data-[state=active]:bg-blue-600">
                Month 1
              </TabsTrigger>
              <TabsTrigger value="month2" className="data-[state=active]:bg-blue-600">
                Month 2
              </TabsTrigger>
              <TabsTrigger value="month3" className="data-[state=active]:bg-blue-600">
                Month 3
              </TabsTrigger>
              <TabsTrigger value="month4" className="data-[state=active]:bg-blue-600">
                Month 4
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {allNotes.map((note) => (
                <NoteCard key={note.weekNumber} note={note} />
              ))}
            </TabsContent>

            {[1, 2, 3, 4].map((month) => (
              <TabsContent key={`month${month}`} value={`month${month}`} className="space-y-4 mt-6">
                {getNotesByMonth(month).length > 0 ? (
                  getNotesByMonth(month).map((note) => (
                    <NoteCard key={note.weekNumber} note={note} />
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-8">
                    No notes for Month {month} yet
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Export and Clear */}
      <div className="flex gap-2">
        <Button
          onClick={handleExport}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export All Notes as Text
        </Button>
        <Button
          onClick={() => setShowDeleteConfirm(true)}
          variant="outline"
          className="border-red-600/50 text-red-400 hover:bg-red-600/10"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
          <Card className="bg-slate-900 border-slate-700 w-96">
            <CardHeader>
              <CardTitle className="text-white">Clear All Notes?</CardTitle>
              <CardDescription>This will permanently delete all {totalNotes} notes and cannot be undone.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-slate-600"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => {
                  clearAllNotes();
                  setShowDeleteConfirm(false);
                }}
              >
                Delete All
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

interface NoteCardProps {
  note: {
    weekNumber: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

function NoteCard({ note }: NoteCardProps) {
  const preview = note.content.substring(0, 150) + (note.content.length > 150 ? '...' : '');

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-blue-600/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-white">{note.title}</h4>
          <p className="text-xs text-slate-500">
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-2">{preview}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {note.content.split(/\s+/).length} words
        </span>
      </div>
    </div>
  );
}
