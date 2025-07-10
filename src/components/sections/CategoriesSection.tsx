import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Category } from '@/types';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import getImageUrl from '@/utils/imageUrl';

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const maxVisibleCategories = 4;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / maxVisibleCategories);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleCategories = categories.slice(
    currentPage * maxVisibleCategories,
    (currentPage + 1) * maxVisibleCategories
  );

  const renderSkeletons = () => (
    Array.from({ length: 4 }).map((_, index) => (
      <Card key={index} className="rounded-2xl border-0 shadow-soft overflow-hidden">
        <Skeleton className="w-full h-56" />
      </Card>
    ))
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6">
            Danh mục sản phẩm
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Khám phá các sản phẩm chất lượng cao từ Tây Nguyên
          </p>
        </div>
        
        <div className="relative">
          {categories.length > maxVisibleCategories && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                onClick={prevPage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                onClick={nextPage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? renderSkeletons() : visibleCategories.map((category) => (
              <Link key={category.id} to={`/products/category/${category.slug}`}>
                <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-500 animate-scale-in rounded-2xl border-0 shadow-soft">
                  <div className="relative">
                    <img
                      src={category.image ? getImageUrl(category.image) : `/images/categories/default.jpg`}
                      alt={category.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                      <h3 className="text-3xl font-bold font-serif mb-3 group-hover:scale-110 transition-transform duration-300">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  size="icon"
                  className="w-3 h-3 rounded-full mx-1"
                  onClick={() => setCurrentPage(index)}
                >
                  <span className="sr-only">Page {index + 1}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
