import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import api from '@/lib/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import getImageUrl from '@/utils/imageUrl';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface NewsCategory {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
}

const NewsForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { handleSubmit, control, setValue } = useForm<{
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    image?: File | string;
  }>();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        console.log('Fetching news categories...');
        const response = await api.get('/news/categories');
        console.log('News categories response:', response.data);
        setCategories(response.data);
        // Nếu có danh mục, mặc định chọn danh mục đầu tiên
        if (response.data.length > 0 && !isEditing) {
          const categoryId = response.data[0]._id || response.data[0].id;
          console.log('Setting default category:', categoryId);
          setCategory(categoryId);
        }
      } catch (error) {
        console.error('Error fetching news categories:', error);
        toast.error('Không thể tải danh sách danh mục tin tức.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      const fetchNewsArticle = async () => {
        try {
          console.log('Fetching news article with id:', id);
          const response = await api.get(`/admin/news/${id}`);
          console.log('News article response:', response.data);
          const article = response.data;
          console.log('Article image field:', article.image);
          console.log('Article category field:', article.category);
          setTitle(article.title);
          setExcerpt(article.excerpt);
          setContent(article.content);
          setAuthor(article.author);
          
          // Xử lý category có thể là string hoặc object
          if (article.category) {
            const categoryId = typeof article.category === 'string' 
              ? article.category 
              : (article.category._id || article.category.id);
            console.log('Setting category from article:', categoryId);
            setCategory(categoryId);
          }
          
          // Xử lý hình ảnh
          if (article.image) {
            setExistingImageUrl(article.image);
          }
        } catch (err) {
          console.error('Error fetching news article:', err);
          toast.error('Không tìm thấy bài viết.');
          navigate('/admin/news');
        }
      };
      fetchNewsArticle();
    }
  }, [id, isEditing, navigate]);

  // Tạo preview khi người dùng chọn file mới
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Tạo URL để preview hình ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!category) {
      setError('Vui lòng chọn danh mục.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('category', category);
    
    if (image) {
      formData.append('image', image);
    }

    try {
      console.log('Submitting form with data:', {
        title,
        excerpt: excerpt.substring(0, 30) + '...',
        author,
        category,
        hasImage: !!image
      });
      
      if (isEditing) {
        await api.put(`/admin/news/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Bài viết đã được cập nhật thành công!');
      } else {
        await api.post('/admin/news', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Bài viết đã được tạo thành công!');
      }
      navigate('/admin/news');
    } catch (err) {
      console.error('Error submitting form:', err);
      let message = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      if (err instanceof AxiosError && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Nội dung bài viết</CardTitle>
          <CardDescription>Điền các thông tin chi tiết dưới đây.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Tóm tắt</Label>
              <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
                rows={10}
                className="min-h-[200px] resize-y"
                placeholder="Nhập nội dung bài viết (có thể sử dụng các thẻ HTML cơ bản như <p>, <h3>, <ul>, <li>, <strong>, <em>)"
              />
              <p className="text-xs text-gray-500">
                Bạn có thể sử dụng các thẻ HTML cơ bản để định dạng nội dung: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="author">Tác giả</Label>
                    <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select
                      value={category}
                      onValueChange={(value) => setCategory(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingCategories ? (
                          <SelectItem value="loading" disabled>Đang tải danh mục...</SelectItem>
                        ) : categories.length === 0 ? (
                          <SelectItem value="none" disabled>Không có danh mục nào</SelectItem>
                        ) : (
                          categories.map((category) => (
                            <SelectItem
                              key={category._id || category.id}
                              value={category._id || category.id || ''}
                            >
                              {category.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {categories.length === 0 && !loadingCategories && (
                      <p className="text-xs text-amber-600 mt-1">
                        Chưa có danh mục nào. Vui lòng tạo danh mục trước.
                      </p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Ảnh đại diện</Label>
              <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />
              <p className="text-xs text-gray-500">Tải lên hình ảnh đại diện cho bài viết. Kích thước tối ưu: 1200x630 pixels.</p>
              
              {/* Hiển thị preview hình ảnh */}
              <div className="mt-4">
                {imagePreview ? (
                  <div className="relative">
                    <p className="text-sm font-medium mb-2">Preview hình ảnh mới:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full max-w-md h-auto object-cover rounded-md border border-gray-200"
                    />
                  </div>
                ) : existingImageUrl && (
                  <div className="relative">
                    <p className="text-sm font-medium mb-2">Hình ảnh hiện tại:</p>
                    <img 
                      src={getImageUrl(existingImageUrl)} 
                      alt="Existing" 
                      className="w-full max-w-md h-auto object-cover rounded-md border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/news')}>Hủy</Button>
                <Button type="submit" disabled={loading || categories.length === 0}>
                    {loading ? 'Đang lưu...' : (isEditing ? 'Lưu thay đổi' : 'Tạo bài viết')}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsForm; 