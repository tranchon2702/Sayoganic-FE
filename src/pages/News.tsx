import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import api from '@/lib/api';
import { NewsItem, NewsCategory } from '@/types';
import { toast } from 'sonner';
import getImageUrl from '@/utils/imageUrl';

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsArticles, setNewsArticles] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch news categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await api.get('/news/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching news categories:', error);
        toast.error('Không thể tải danh mục tin tức.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch news articles from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await api.get('/news');
        setNewsArticles(response.data.news.map((item: {
          _id: string;
          title: string;
          excerpt: string;
          content: string;
          image?: string;
          createdAt: string;
          author: string;
          category: any;
          slug: string;
        }) => ({
          id: item._id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          image: item.image ? getImageUrl(item.image) : 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
          publishedAt: item.createdAt,
          author: item.author,
          category: typeof item.category === 'string' ? item.category : (item.category?._id || item.category?.id),
          categoryName: typeof item.category === 'string' ? '' : item.category?.name,
          slug: item.slug
        })));
      } catch (error) {
        console.error('Error fetching news:', error);
        toast.error('Không thể tải tin tức. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || 
      categories.find(cat => (cat._id === article.category || cat.id === article.category) && cat.slug === selectedCategory);
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles.length > 0 ? newsArticles[0] : null;
  const regularArticles = newsArticles.length > 1 ? newsArticles.slice(1) : [];

  // Function to estimate read time based on content length
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} phút đọc`;
  };

  // Function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId || cat.id === categoryId);
    return category ? category.name : 'Tin tức';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#0d6938]/10 to-[#0d6938]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-serif mb-6">
              Tin tức & <span className="text-[#0d6938] font-script text-6xl md:text-7xl">Cẩm nang</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cập nhật những tin tức mới nhất về sản phẩm, kỹ thuật canh tác và những kiến thức bổ ích về thực phẩm sạch
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Button
                key="all"
                variant={selectedCategory === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={
                  `rounded-full transition-colors duration-200 ` +
                  (selectedCategory === 'all'
                    ? "bg-[#0d6938] text-white hover:bg-[#095127] border-[#0d6938]"
                    : "border-[#0d6938] text-[#0d6938] hover:bg-[#e6f4ec] hover:text-[#095127]")
                }
              >
                Tất cả
              </Button>
              {loadingCategories ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Đang tải...</span>
                </div>
              ) : (
                categories.map((category) => (
                  <Button
                    key={category._id || category.id}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.slug)}
                    className={
                      `rounded-full transition-colors duration-200 ` +
                      (selectedCategory === category.slug
                        ? "bg-[#0d6938] text-white hover:bg-[#095127] border-[#0d6938]"
                        : "border-[#0d6938] text-[#0d6938] hover:bg-[#e6f4ec] hover:text-[#095127]")
                    }
                  >
                    {category.name}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-24 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0d6938]" />
          <span className="ml-2 text-lg">Đang tải tin tức...</span>
        </div>
      ) : (
        <>
          {/* Featured Article */}
          {featuredArticle && (
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 font-serif mb-8">Bài viết nổi bật</h2>
                <Card className="overflow-hidden shadow-elegant rounded-2xl border-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-full">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#0d6938] text-white px-3 py-1 rounded-full text-sm font-medium">
                          Nổi bật
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(featuredArticle.publishedAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{featuredArticle.author}</span>
                          </div>
                          <span>{getReadTime(featuredArticle.content)}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 font-serif leading-tight">
                          {featuredArticle.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                        <Button asChild className="bg-[#0d6938] hover:bg-[#095127] w-fit text-white">
                          <Link to={`/news/${featuredArticle.slug}`} className="flex items-center space-x-2">
                            <span>Đọc tiếp</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </section>
          )}

          {/* Articles Grid */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 font-serif mb-8">Tất cả bài viết</h2>
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-elegant transition-all duration-500 animate-scale-in group rounded-2xl border-0 shadow-soft" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-[#0d6938] text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                            {article.categoryName || getCategoryName(article.category)}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <span>{getReadTime(article.content)}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 font-serif leading-tight group-hover:text-[#0d6938] transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <User className="w-3 h-3" />
                              <span>{article.author}</span>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="text-[#0d6938] hover:text-[#095127]">
                              <Link to={`/news/${article.slug}`} className="flex items-center space-x-1">
                                <span>Đọc tiếp</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Không tìm thấy bài viết nào phù hợp với từ khóa tìm kiếm.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default News;
