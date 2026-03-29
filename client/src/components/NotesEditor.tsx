import { useNotes } from '@/contexts/NotesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NotesEditorProps {
  weekNumber: number;
  weekTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotesEditor({ weekNumber, weekTitle, isOpen, onClose }: NotesEditorProps) {
  const { getWeekNote, saveNote, deleteNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing note when editor opens
  useEffect(() => {
    if (isOpen) {
      const existingNote = getWeekNote(weekNumber);
      if (existingNote) {
        setTitle(existingNote.title);
        setContent(existingNote.content);
      } else {
        setTitle(`Week ${weekNumber}: ${weekTitle}`);
        setContent('');
      }
    }
  }, [isOpen, weekNumber, weekTitle, getWeekNote]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveNote(weekNumber, title, content);
      setIsSaving(false);
      onClose();
    }, 300);
  };

  const handleDelete = () => {
    if (confirm('Delete this note? This cannot be undone.')) {
      deleteNote(weekNumber);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-900 border-slate-700 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-700">
          <div>
            <CardTitle className="text-white">Week {weekNumber} Notes</CardTitle>
            <CardDescription>{weekTitle}</CardDescription>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Note Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter note title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Reflections & Learning Notes
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-mono text-sm"
              placeholder="Write your learning reflections, key takeaways, challenges faced, and insights gained this week..."
            />
            <p className="text-xs text-slate-500 mt-2">
              {content.length} characters • Last updated: {getWeekNote(weekNumber)?.updatedAt ? new Date(getWeekNote(weekNumber)!.updatedAt).toLocaleString() : 'Not saved yet'}
            </p>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-3">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> Write about what you learned, challenges you faced, projects you built, and how you'll apply this knowledge next week.
            </p>
          </div>
        </CardContent>

        <div className="border-t border-slate-700 p-4 flex gap-2 justify-end">
          <Button
            variant="outline"
            className="border-slate-600 text-slate-200 hover:bg-slate-800"
            onClick={onClose}
          >
            Cancel
          </Button>
          {getWeekNote(weekNumber) && (
            <Button
              variant="outline"
              className="border-red-600/50 text-red-400 hover:bg-red-600/10"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Note'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
