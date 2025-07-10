import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Product } from '@/types';
import getImageUrl from '@/utils/imageUrl';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ? getImageUrl(product.image) : 'https://via.placeholder.com/300x300?text=No+Image',
      category: product.category,
      quantity: 1,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  const productLink = `/products/${product.slug || product.id}`;
  
  // Xử lý hiển thị hình ảnh sản phẩm
  const productImage = product.image 
    ? getImageUrl(product.image)
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in flex flex-col">
      <Link to={productLink} className="block">
        <div className="relative">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.isNewProduct && (
              <Badge className="bg-blue-500 text-white border-none px-2 py-1 text-xs font-bold shadow-md">Mới</Badge>
            )}
            {product.isHot && (
              <Badge className="bg-red-500 text-white border-none px-2 py-1 text-xs font-bold shadow-md">Hot</Badge>
            )}
            {discountPercent > 0 && (
              <Badge className="bg-orange-500 text-white border-none px-2 py-1 text-xs font-bold shadow-md">-{discountPercent}%</Badge>
            )}
          </div>

          <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0"
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked)
              }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0" asChild>
              <Link to={productLink}>
                <Eye className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="absolute bottom-[-100%] group-hover:bottom-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] transition-all duration-300">
            <Button 
              onClick={handleAddToCart} 
              size="sm" 
              className="w-full flex items-center space-x-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Thêm vào giỏ</span>
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">{categoryName}</p>
          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors h-12">
            <Link to={productLink}>{product.name}</Link>
          </h3>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.rating !== undefined && (
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
