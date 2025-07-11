import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Product } from '@/types';
import { AxiosError } from 'axios';
import getImageUrl from '@/utils/imageUrl';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Scroll to top when component mounts or when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const productRes = await api.get<Product>(`/products/${slug}`);
        const fetchedProduct = productRes.data;
        setProduct(fetchedProduct);

        if (typeof fetchedProduct.category === 'object' && fetchedProduct.category?.slug) {
          const relatedRes = await api.get<{ products: Product[] }>(
            `/products?category=${fetchedProduct.category.slug}&limit=5`
          );
          const filteredRelated = relatedRes.data.products.filter(
            p => p.id !== fetchedProduct.id
          ).slice(0, 4); // Ensure only 4 are shown
          setRelatedProducts(filteredRelated);
        }
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Error fetching product:', axiosError);
        toast.error('Không tìm thấy sản phẩm hoặc đã có lỗi xảy ra.');
        setLoading(false);
        if (axiosError.response?.status === 404) {
          navigate('/not-found');
        }
      }
    };

    fetchProductData();
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ? getImageUrl(product.image) : 'https://via.placeholder.com/400x400?text=No+Image',
      category: typeof product.category === 'string' ? product.category : product.category.name,
      quantity: quantity
    });
    
    toast.success(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d6938]"></div>
          <span className="ml-3 text-lg">Đang tải sản phẩm...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
     return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <p className="text-gray-600 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild>
                <Link to="/products">Quay lại trang sản phẩm</Link>
            </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
    
  const categoryName = typeof product.category === 'string' ? product.category : product.category.name;
  const categorySlug = typeof product.category === 'object' && product.category.slug 
    ? product.category.slug 
    : 'all';

  // Xử lý hình ảnh sản phẩm
  const productImages = product.image
    ? [getImageUrl(product.image)]
    : ['https://via.placeholder.com/400x400?text=No+Image'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-[#0d6938]">Trang chủ</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#0d6938]">Sản phẩm</Link>
          <span>/</span>
          <Link to={`/products?category=${categorySlug}`} className="hover:text-[#0d6938]">
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="relative">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.isHot && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white border-none">
                  Bán chạy
                </Badge>
              )}
              {discountPercent > 0 && (
                <Badge className="absolute top-4 right-4 bg-[#0d6938] text-white border-none">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-md ${
                    selectedImage === index ? 'ring-2 ring-offset-2 ring-[#0d6938]' : 'hover:opacity-80'
                  } transition-all duration-200`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {categoryName}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 font-playfair mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.rating || 0}) • {product.reviewCount || 0} đánh giá
                  </span>
                </div>
                <span className={`text-sm ${product.stock && product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock && product.stock > 0 ? `✓ Còn ${product.stock} sản phẩm` : 'Hết hàng'}
                </span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-3xl font-bold text-[#0d6938]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {product.features && (
              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-semibold text-gray-900">Đặc điểm nổi bật:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 mt-1.5 bg-[#0d6938] rounded-full flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-6 border-t">
              <div className="flex items-center space-x-4 mb-4">
                <span className="font-medium text-gray-900">Số lượng:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || !product.stock}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-6 py-2 font-bold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    disabled={quantity >= (product.stock || 0) || !product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  onClick={handleAddToCart} 
                  size="lg" 
                  className="flex-1 bg-[#0d6938] hover:bg-[#095127] text-white text-lg"
                  disabled={!product.stock || product.stock === 0}
                >
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  {product.stock && product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`border-2 ${isLiked ? 'text-red-500 border-red-500' : 'text-gray-400'}`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="w-6 h-6 text-[#0d6938]" />
                <span>Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-6 h-6 text-[#0d6938]" />
                <span>Đảm bảo chất lượng</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="w-6 h-6 text-[#0d6938]" />
                <span>Đổi trả trong 7 ngày</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-16 bg-white p-8 rounded-lg shadow-md">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-md">
            <TabsTrigger value="description" className="data-[state=active]:bg-white data-[state=active]:text-[#0d6938] data-[state=active]:shadow-sm">Mô tả chi tiết</TabsTrigger>
            <TabsTrigger value="specifications" className="data-[state=active]:bg-white data-[state=active]:text-[#0d6938] data-[state=active]:shadow-sm">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:text-[#0d6938] data-[state=active]:shadow-sm">Đánh giá ({product.reviewCount || 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none prose-h4:font-playfair prose-h4:text-xl prose-p:text-gray-700 prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-700">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          
          {product.specifications && (
            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-800">{key}:</span>
                    <span className="text-gray-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-8">
              <p className="text-gray-600">Chức năng đánh giá sẽ được cập nhật trong thời gian sớm nhất.</p>
            </div>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-6">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
