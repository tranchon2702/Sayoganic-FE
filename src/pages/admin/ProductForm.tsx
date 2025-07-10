import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Category } from '@/types';
import api from '@/lib/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import getImageUrl from '@/utils/imageUrl';
import { Badge } from '@/components/ui/badge';

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [stock, setStock] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isHot, setIsHot] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Tính % giảm giá
  const discountPercentage = originalPrice > 0 && price < originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  useEffect(() => {
    // Fetch categories for the select dropdown
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        toast.error('Không thể tải danh mục.');
      }
    };
    fetchCategories();

    // If editing, fetch the product data
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/admin/products/${id}`);
          const product = response.data;
          
          if (!product || !product.name) {
            toast.error('Dữ liệu sản phẩm không hợp lệ.');
            navigate('/admin/products');
            return;
          }
          
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setOriginalPrice(product.originalPrice || product.price);
          // Sử dụng id hoặc _id tùy theo cái nào có giá trị
          const catId = product.category._id || product.category.id;
          setCategoryId(catId);
          setStock(product.stock);
          setIsFeatured(product.isFeatured);
          setIsHot(product.isHot);
          setIsNewProduct(product.isNewProduct);
          setExistingImageUrl(product.image);
        } catch (err) {
          toast.error('Không tìm thấy sản phẩm.');
          navigate('/admin/products');
        }
      };
      fetchProduct();
    }
  }, [id, isEditing, navigate]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', String(price));
    formData.append('originalPrice', String(originalPrice));
    formData.append('category', categoryId);
    formData.append('stock', String(stock));
    formData.append('isFeatured', String(isFeatured));
    formData.append('isHot', String(isHot));
    formData.append('isNewProduct', String(isNewProduct));
    
    // Append image file if selected
    if (image) {
      formData.append('image', image);
    }

    try {
      if (isEditing) {
        await api.put(`/admin/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Sản phẩm đã được cập nhật thành công!');
      } else {
        await api.post('/admin/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Sản phẩm đã được tạo thành công!');
      }
      navigate('/admin/products');
    } catch (err) {
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
        {isEditing ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới'}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin sản phẩm</CardTitle>
          <CardDescription>Điền các thông tin chi tiết dưới đây.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Select value={categoryId} onValueChange={setCategoryId} required>
                    <SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                    <SelectContent>
                        {categories.map(cat => (
                            <SelectItem key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="price">Giá bán (VND)</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="originalPrice">Giá gốc (VND)</Label>
                    <Input id="originalPrice" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} />
                    <div className="flex items-center">
                      <p className="text-xs text-gray-500">
                        Để hiển thị giảm giá, giá gốc phải cao hơn giá bán.
                      </p>
                      {discountPercentage > 0 && (
                        <Badge className="bg-orange-500 text-white ml-2 px-2">-{discountPercentage}%</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Phần trăm giảm giá sẽ được tự động tính và hiển thị trên sản phẩm.
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Tồn kho</Label>
                    <Input id="stock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Hình ảnh sản phẩm</Label>
              <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />
              <p className="text-xs text-gray-500">Tải lên hình ảnh mới. Nếu đang chỉnh sửa và không tải lên hình ảnh mới, hình ảnh cũ sẽ được giữ lại.</p>
              
              {/* Hiển thị preview hình ảnh */}
              <div className="mt-4">
                {imagePreview ? (
                  <div className="relative">
                    <p className="text-sm font-medium mb-2">Preview hình ảnh mới:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-md border border-gray-200"
                    />
                  </div>
                ) : existingImageUrl && (
                  <div className="relative">
                    <p className="text-sm font-medium mb-2">Hình ảnh hiện tại:</p>
                    <img 
                      src={getImageUrl(existingImageUrl)} 
                      alt="Existing" 
                      className="w-32 h-32 object-cover rounded-md border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-md bg-gray-50">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <Checkbox id="isFeatured" checked={isFeatured} onCheckedChange={(checked) => setIsFeatured(Boolean(checked))} />
                  <Label htmlFor="isFeatured" className="cursor-pointer">Sản phẩm nổi bật</Label>
                </div>
                <p className="text-xs text-gray-500 ml-6">Hiển thị sản phẩm ở trang chủ</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <Checkbox id="isHot" checked={isHot} onCheckedChange={(checked) => setIsHot(Boolean(checked))} />
                  <Label htmlFor="isHot" className="cursor-pointer">Sản phẩm Hot</Label>
                </div>
                <p className="text-xs text-gray-500 ml-6">Hiển thị thẻ "Hot" trên sản phẩm</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <Checkbox id="isNewProduct" checked={isNewProduct} onCheckedChange={(checked) => setIsNewProduct(Boolean(checked))} />
                  <Label htmlFor="isNewProduct" className="cursor-pointer">Sản phẩm Mới</Label>
                </div>
                <p className="text-xs text-gray-500 ml-6">Hiển thị thẻ "Mới" trên sản phẩm</p>
              </div>
            </div>

            <div className="border p-4 rounded-md bg-gray-50">
              <Label className="mb-2 block">Xem trước các thẻ sẽ hiển thị trên sản phẩm:</Label>
              <div className="flex flex-wrap gap-2">
                {isNewProduct && (
                  <Badge className="bg-blue-500 text-white border-none px-2 py-1 text-xs font-bold shadow-md">Mới</Badge>
                )}
                {isHot && (
                  <Badge className="bg-red-500 text-white border-none px-2 py-1 text-xs font-bold shadow-md">Hot</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-orange-500 text-white border-none px-2 py-1 text-xs font-bold shadow-md">-{discountPercentage}%</Badge>
                )}
                {!isNewProduct && !isHot && discountPercentage === 0 && (
                  <span className="text-sm text-gray-500">Không có thẻ nào được hiển thị</span>
                )}
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>Hủy</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Đang lưu...' : (isEditing ? 'Lưu thay đổi' : 'Tạo sản phẩm')}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm; 