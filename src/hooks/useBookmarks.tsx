import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useBookmarks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`bookmarks_${user.id}`);
      if (saved) setBookmarks(JSON.parse(saved));
    }
  }, [user]);

  const toggleBookmark = useCallback((jobId: string) => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to bookmark jobs.', variant: 'destructive' });
      return;
    }

    setBookmarks(prev => {
      const isBookmarked = prev.includes(jobId);
      const next = isBookmarked ? prev.filter(id => id !== jobId) : [...prev, jobId];
      localStorage.setItem(`bookmarks_${user.id}`, JSON.stringify(next));
      toast({
        title: isBookmarked ? 'Bookmark Removed' : 'Job Bookmarked',
        description: isBookmarked ? 'Job removed from your saved list.' : 'Job saved to your bookmarks!',
      });
      return next;
    });
  }, [user, toast]);

  const isBookmarked = useCallback((jobId: string) => bookmarks.includes(jobId), [bookmarks]);

  return { bookmarks, toggleBookmark, isBookmarked };
};
