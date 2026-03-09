import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <Card className="border-0 card-shadow">
    <CardContent className="p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-2">{actionLabel}</Button>
        )}
      </motion.div>
    </CardContent>
  </Card>
);

export default EmptyState;
