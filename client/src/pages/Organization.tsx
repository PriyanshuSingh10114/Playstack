import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { ChevronDown, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import type { Employee } from '@/types';

interface OrgNode extends Employee {
  children?: OrgNode[];
}

const TreeNode = ({ node, level = 0 }: { node: OrgNode, level?: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${level > 0 ? 'ml-6 border-l border-border/50' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-5 h-5 mr-1 flex items-center justify-center text-muted-foreground">
          {hasChildren && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            {node.profileImage ? (
              <img src={node.profileImage} alt={node.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={16} />
            )}
          </div>
          <div>
            <div className="font-medium text-sm">{node.name}</div>
            <div className="text-xs text-muted-foreground">{node.designation}</div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="ml-2">
              {node.children?.map((child: OrgNode) => (
                <TreeNode key={child._id} node={child} level={level + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Organization: React.FC = () => {
  const { data: treeData, isLoading } = useQuery({
    queryKey: ['organization-tree'],
    queryFn: async () => {
      const res = await api.get('/organization/tree');
      return res.data.data;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Organization Hierarchy</h2>
        <p className="text-muted-foreground mt-1">View the reporting structure of the company.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : treeData && treeData.length > 0 ? (
          <div className="space-y-2">
            {treeData.map((node: OrgNode) => (
              <TreeNode key={node._id} node={node} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No organizational data found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Organization;
