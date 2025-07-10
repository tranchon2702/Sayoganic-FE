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
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import api from '@/lib/api';
import { toast } from 'sonner';
import { formatPrice } from '@/utils/formatters';
import getImageUrl from '@/utils/imageUrl';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch all products, not just paginated for admin view initially
      console.log('Fetching products from API...');
      const response = await api.get('/products?limit=100'); 
      console.log('Raw API response:', response.data);
      
      // Map backend data to frontend model
      const mappedProducts = response.data.products.map((product: {
        _id: string;
        name: string;
        slug: string;
        price: number;
        originalPrice?: number;
        image?: string;
        images?: string[];
        category: {
          _id: string;
          name: string;
        };
        rating?: number;
        reviewCount?: number;
        stock?: number;
        isNewProduct?: boolean;
        isHot?: boolean;
        isFeatured?: boolean;
        description?: string;
        features?: string[];
        specifications?: Record<string, string>;
      }) => {
        // Đảm bảo product._id tồn tại
        if (!product._id) {
          console.error('Product without ID:', product);
        }
        
        return {
          id: product._id,
          _id: product._id, // Keep _id for backward compatibility
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          images: product.images || [],
          category: product.category,
          rating: product.rating,
          reviewCount: product.reviewCount,
          stock: product.stock,
          isNewProduct: product.isNewProduct,
          isHot: product.isHot,
          isFeatured: product.isFeatured,
          description: product.description,
          features: product.features,
          specifications: product.specifications,
        };
      });
      console.log('Mapped products:', mappedProducts);
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Không thể tải danh sách sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleDelete = async (productId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      return;
    }
    try {
      await api.delete(`/admin/products/${productId}`);
      toast.success('Sản phẩm đã được xóa thành công.');
      fetchProducts(); // Refresh the list
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Sản phẩm</h1>
          <p className="text-gray-600">Thêm, sửa, hoặc xóa sản phẩm tại đây.</p>
        </div>
        <Button asChild>
          <Link to="/admin/products/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Thêm sản phẩm
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p>Đang tải...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Chưa có sản phẩm nào.</p>
            <Button asChild>
              <Link to="/admin/products/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Thêm sản phẩm đầu tiên
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Hình ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead className="hidden md:table-cell">Tồn kho</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.image ? getImageUrl(product.image) : '/placeholder.svg'}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock && product.stock > 0 ? 'default' : 'destructive'}>
                      {product.stock && product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                        asChild
                      >
                        {product._id || product.id ? (
                          <Link to={`/admin/products/edit/${product._id || product.id}`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Sửa</span>
                          </Link>
                        ) : (
                          <span className="text-gray-400" onClick={() => toast.error('Không thể sửa sản phẩm này vì không có ID')}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Sửa</span>
                          </span>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                        onClick={() => handleDelete(product.id)}
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

export default ProductManagement; 