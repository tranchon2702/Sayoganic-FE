import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';
import { toast } from 'sonner';
import getImageUrl from '@/utils/imageUrl';

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  category: string;
  slug: string;
}

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/news/${slug}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching news article:', error);
        toast.error('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // Function to estimate read time based on content length
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} phút đọc`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="py-24 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#0d6938]" />
            <span className="ml-2 text-lg">Đang tải bài viết...</span>
          </div>
        ) : article ? (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 text-[#0d6938]"
              asChild
            >
              <Link to="/news" className="flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại tin tức</span>
              </Link>
            </Button>

            <Card className="overflow-hidden border-0 shadow-elegant rounded-2xl">
              <div className="relative h-[400px]">
                <img
                  src={article.image ? getImageUrl(article.image) : 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=400&fit=crop'}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="text-white space-y-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <span>{getReadTime(article.content)}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
                      {article.title}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#0d6938]"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h2>
            <p className="text-gray-600 mb-8">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild className="bg-[#0d6938] hover:bg-[#095127]">
              <Link to="/news">Quay lại trang tin tức</Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail; 