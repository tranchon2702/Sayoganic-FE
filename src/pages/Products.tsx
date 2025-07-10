import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Product, Category } from '@/types';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const Products = () => {
  const { category: categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setAllProducts(productsRes.data.products);
        setAllCategories(categoriesRes.data);
      } catch (err) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Set selected category from URL
  useEffect(() => {
    if (categorySlug && allCategories.length > 0) {
      const category = allCategories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategories([category.id]);
      }
    }
  }, [categorySlug, allCategories]);

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      // Defensively check product and product.category
      if (!product || !product.category || typeof product.category !== 'object') {
        return false;
      }

      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category checkbox filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category.id)) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const getCategoryTitle = () => {
    if (categorySlug) {
      const cat = allCategories.find(c => c.slug === categorySlug);
      return cat ? cat.name : 'Sản phẩm';
    }
    if (searchQuery) {
      return `Kết quả tìm kiếm cho "${searchQuery}"`;
    }
    return 'Tất cả sản phẩm';
  };
  
  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-600">
            Hiển thị {filteredProducts.length} sản phẩm
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
              
              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Danh mục</h4>
                <div className="space-y-2">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))
                  ) : (
                    allCategories.map(cat => (
                      <div key={cat.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={cat.id}
                          checked={selectedCategories.includes(cat.id)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(cat.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={cat.id} className="text-sm text-gray-700">
                          {cat.name}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Khoảng giá</h4>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()}đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 1000000]);
                }}
                className="w-full border-[#0d6938] text-[#0d6938] hover:bg-[#e6f4ec] hover:text-[#095127]"
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid'
                      ? 'bg-[#0d6938] text-white hover:bg-[#095127] border-[#0d6938]'
                      : 'border-[#0d6938] text-[#0d6938] hover:bg-[#e6f4ec] hover:text-[#095127]'}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list'
                      ? 'bg-[#0d6938] text-white hover:bg-[#095127] border-[#0d6938]'
                      : 'border-[#0d6938] text-[#0d6938] hover:bg-[#e6f4ec] hover:text-[#095127]'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-[#0d6938] focus:ring-[#0d6938] focus:border-[#0d6938]">
                <SortAsc className="w-4 h-4 mr-2 text-[#0d6938]" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="name"
                  className="data-[state=checked]:bg-[#0d6938] data-[state=checked]:text-white"
                >
                  Sắp xếp theo tên
                </SelectItem>
                <SelectItem
                  value="price-low"
                  className="data-[state=checked]:bg-[#0d6938] data-[state=checked]:text-white"
                >
                  Giá thấp đến cao
                </SelectItem>
                <SelectItem
                  value="price-high"
                  className="data-[state=checked]:bg-[#0d6938] data-[state=checked]:text-white"
                >
                  Giá cao đến thấp
                </SelectItem>
                <SelectItem
                  value="rating"
                  className="data-[state=checked]:bg-[#0d6938] data-[state=checked]:text-white"
                >
                  Đánh giá cao nhất
                </SelectItem>
              </SelectContent>  
              </Select>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <Skeleton className="w-full h-48" />
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-8 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mt-2">Vui lòng thử lại với bộ lọc khác.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
