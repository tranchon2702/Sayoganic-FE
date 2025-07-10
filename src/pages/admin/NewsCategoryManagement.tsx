import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { NewsCategory } from '@/types';
import axios from 'axios';

const NewsCategoryManagement = () => {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      console.log('Fetching news categories...');
      const response = await api.get('/news/categories');
      console.log('News categories response:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching news categories:', error);
      toast.error('Không thể tải danh sách danh mục tin tức.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      toast.error('Vui lòng nhập tên danh mục.');
      return;
    }

    try {
      console.log('Adding new category:', newCategory);
      await api.post('/admin/news/categories', { name: newCategory });
      setNewCategory('');
      toast.success('Đã thêm danh mục mới.');
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Không thể thêm danh mục.');
    }
  };

  const startEditing = (category: NewsCategory) => {
    setEditingId(category.id || category._id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleUpdateCategory = async (id: string) => {
    if (!editName.trim()) {
      toast.error('Tên danh mục không được để trống.');
      return;
    }

    try {
      console.log('Updating category:', id, editName);
      await api.put(`/admin/news/categories/${id}`, { name: editName });
      setEditingId(null);
      toast.success('Đã cập nhật danh mục.');
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Không thể cập nhật danh mục.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      return;
    }

    try {
      console.log('Deleting category:', id);
      await api.delete(`/admin/news/categories/${id}`);
      toast.success('Đã xóa danh mục.');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      let errorMessage = 'Không thể xóa danh mục.';
      
      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý Danh mục Tin tức</h1>
        <p className="text-muted-foreground">
          Thêm, sửa, hoặc xóa danh mục tin tức tại đây.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thêm Danh mục Mới</CardTitle>
            <CardDescription>
              Tạo danh mục mới để phân loại tin tức của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory} className="flex items-end gap-4">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input
                  id="name"
                  placeholder="Nhập tên danh mục"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={!newCategory.trim()}>
                Thêm danh mục
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách Danh mục</CardTitle>
            <CardDescription>
              Quản lý tất cả danh mục tin tức của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Đang tải...</p>
            ) : categories.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">
                Chưa có danh mục nào. Hãy tạo danh mục đầu tiên.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Tên danh mục</TableHead>
                    <TableHead className="w-[200px]">Slug</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id || category._id}>
                      <TableCell>
                        {editingId === (category.id || category._id) ? (
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="max-w-sm"
                          />
                        ) : (
                          category.name
                        )}
                      </TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {editingId === (category.id || category._id) ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleUpdateCategory(category.id || category._id!)}
                                className="h-8 w-8 text-green-600 hover:text-green-800 hover:bg-green-100"
                              >
                                <Save className="h-4 w-4" />
                                <span className="sr-only">Lưu</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={cancelEditing}
                                className="h-8 w-8 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Hủy</span>
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startEditing(category)}
                              className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Sửa</span>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(category.id || category._id!)}
                            className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Xóa</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsCategoryManagement; 