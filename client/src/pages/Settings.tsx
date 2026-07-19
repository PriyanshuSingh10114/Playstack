import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/upload/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Update employee with new image URL
      if (user?.employeeId) {
        await api.put(`/employees/${user.employeeId}`, {
          profileImage: res.data.data.url
        });
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success('Profile image updated successfully');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      setFile(null);
    },
    onError: () => {
      toast.error('Failed to upload image');
    },
    onSettled: () => {
      setUploading(false);
    }
  });

  const handleUpload = () => {
    if (file) {
      setUploading(true);
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
              {/* If user had profile image we'd show it here */}
              <span className="text-2xl font-medium text-muted-foreground">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="picture">Picture</Label>
              <Input 
                id="picture" 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
          >
            {uploading ? 'Uploading...' : 'Update Image'}
          </Button>
        </CardContent>
      </Card>
      
      {/* Additional settings like change password could go here */}
    </div>
  );
};

export default Settings;
