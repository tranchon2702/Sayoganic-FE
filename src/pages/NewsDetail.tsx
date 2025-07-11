import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import api from '@/lib/api';
import { NewsItem } from '@/types';
import { toast } from 'sonner';
import getImageUrl from '@/utils/imageUrl';

// Define a type for the raw news item from the API
interface NewsItemRaw {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  createdAt: string;
  author?: string;
  category: string | { _id?: string; id?: string; name?: string; slug?: string };
  slug: string;
}

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts or when news article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/news/${slug}`);
        const newsItem = response.data as NewsItemRaw;
        
        setNews({
          id: newsItem._id,
          title: newsItem.title,
          content: newsItem.content,
          excerpt: newsItem.excerpt,
          image: newsItem.image ? getImageUrl(newsItem.image) : 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
          publishedAt: newsItem.createdAt,
          author: newsItem.author || 'Admin',
          category: typeof newsItem.category === 'string' ? newsItem.category : (newsItem.category?._id || newsItem.category?.id || ''),
          categoryName: typeof newsItem.category === 'string' ? '' : newsItem.category?.name || '',
          slug: newsItem.slug
        });
        
        // Fetch related news
        const relatedResponse = await api.get('/news');
        const allNews = relatedResponse.data.news as NewsItemRaw[];
        const filtered = allNews
          .filter((item: NewsItemRaw) => item._id !== newsItem._id)
          .slice(0, 3)
          .map((item: NewsItemRaw) => ({
            id: item._id,
            title: item.title,
            excerpt: item.excerpt,
            content: item.content,
            image: item.image ? getImageUrl(item.image) : 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
            publishedAt: item.createdAt,
            author: item.author || 'Admin',
            category: typeof item.category === 'string' ? item.category : (item.category?._id || item.category?.id || ''),
            categoryName: typeof item.category === 'string' ? '' : item.category?.name || '',
            slug: item.slug
          }));
          
        setRelatedNews(filtered);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        toast.error('Không thể tải tin tức. Vui lòng thử lại sau.');
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug, navigate]);

  // Function to estimate read time based on content length
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} phút đọc`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d6938]"></div>
          <span className="ml-3 text-lg">Đang tải bài viết...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Không tìm thấy bài viết</h1>
          <p className="text-gray-600 mb-8">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Button asChild>
            <Link to="/news">Quay lại trang tin tức</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
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
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="text-white space-y-4">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(news.publishedAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{news.author}</span>
                  </div>
                  <span>{getReadTime(news.content)}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
                  {news.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#0d6938]"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail; 