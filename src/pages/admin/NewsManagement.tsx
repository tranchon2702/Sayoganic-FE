import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { NewsItem } from '@/types';
import api from '@/lib/api';
import { toast } from 'sonner';
import getImageUrl from '@/utils/imageUrl';

const NewsManagement = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await api.get('/news?limit=100'); 
      console.log('News API response:', response.data);
      setNews(response.data.news);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Không thể tải danh sách tin tức.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);
  
  const handleDelete = async (newsId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      return;
    }
    try {
      await api.delete(`/admin/news/${newsId}`);
      toast.success('Bài viết đã được xóa thành công.');
      fetchNews(); // Refresh the list
    } catch (error) {
      toast.error('Xóa bài viết thất bại.');
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Tin tức</h1>
          <p className="text-gray-600">Thêm, sửa, hoặc xóa bài viết tại đây.</p>
        </div>
        <Button asChild>
          <Link to="/admin/news/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Thêm bài viết
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p>Đang tải...</p>
        ) : news.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Chưa có bài viết nào.</p>
            <Button asChild>
              <Link to="/admin/news/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Thêm bài viết đầu tiên
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Tác giả</TableHead>
                <TableHead className="hidden md:table-cell">Ngày tạo</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((article) => (
                <TableRow key={article._id || article.id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt={article.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={article.image ? getImageUrl(article.image) : '/placeholder.svg'}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(article.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                        asChild
                      >
                        <Link to={`/admin/news/edit/${article._id || article.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Sửa</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                        onClick={() => handleDelete(article._id || article.id)}
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
      </div>
    </div>
  );
};

export default NewsManagement; 