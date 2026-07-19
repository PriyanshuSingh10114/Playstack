import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { EmployeeStatus, Role } from '@/types';

const employeeSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  employeeId: z.string().min(2, 'Employee ID is required'),
  designation: z.string().min(2, 'Designation is required'),
  salary: z.coerce.number().positive('Salary must be positive'),
  joiningDate: z.string().min(1, 'Joining date is required'),
  status: z.nativeEnum(EmployeeStatus),
  role: z.nativeEnum(Role),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const EmployeeFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      status: EmployeeStatus.ACTIVE,
      role: Role.EMPLOYEE,
    }
  });

  // Fetch employee if edit mode
  useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      if (!isEdit) return null;
      const res = await api.get(`/employees/${id}`);
      const data = res.data.data;
      // Format date for input
      data.joiningDate = new Date(data.joiningDate).toISOString().split('T')[0];
      reset(data);
      return data;
    },
    enabled: isEdit,
  });

  const mutation = useMutation({
    mutationFn: async (data: EmployeeFormValues) => {
      if (isEdit) {
        return await api.put(`/employees/${id}`, data);
      } else {
        return await api.post('/employees', data);
      }
    },
    onSuccess: () => {
      toast.success(`Employee ${isEdit ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      navigate('/employees');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: EmployeeFormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {isEdit ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <Button variant="outline" onClick={() => navigate('/employees')}>Cancel</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input {...register('name')} className={errors.name ? 'border-destructive' : ''} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" {...register('email')} className={errors.email ? 'border-destructive' : ''} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Employee ID</Label>
                <Input {...register('employeeId')} className={errors.employeeId ? 'border-destructive' : ''} />
                {errors.employeeId && <p className="text-sm text-destructive">{errors.employeeId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Phone (Optional)</Label>
                <Input {...register('phone')} />
              </div>

              <div className="space-y-2">
                <Label>Designation</Label>
                <Input {...register('designation')} className={errors.designation ? 'border-destructive' : ''} />
                {errors.designation && <p className="text-sm text-destructive">{errors.designation.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Salary</Label>
                <Input type="number" {...register('salary')} className={errors.salary ? 'border-destructive' : ''} />
                {errors.salary && <p className="text-sm text-destructive">{errors.salary.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Joining Date</Label>
                <Input type="date" {...register('joiningDate')} className={errors.joiningDate ? 'border-destructive' : ''} />
                {errors.joiningDate && <p className="text-sm text-destructive">{errors.joiningDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <select 
                  {...register('status')} 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value={EmployeeStatus.ACTIVE}>Active</option>
                  <option value={EmployeeStatus.INACTIVE}>Inactive</option>
                  <option value={EmployeeStatus.ON_LEAVE}>On Leave</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <select 
                  {...register('role')} 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value={Role.EMPLOYEE}>Employee</option>
                  <option value={Role.HR_MANAGER}>HR Manager</option>
                  <option value={Role.SUPER_ADMIN}>Super Admin</option>
                </select>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Employee'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeFormPage;
