import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Layout from "@/components/layout/Layout";
import getImageUrl from '@/utils/imageUrl';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, isLoading } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
    toast.success('Đã cập nhật số lượng!');
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`Đã xóa ${name} khỏi giỏ hàng!`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Đã xóa tất cả sản phẩm khỏi giỏ hàng!');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d6938] mx-auto"></div>
            <h1 className="text-3xl font-bold text-gray-900 font-playfair">
              Đang tải giỏ hàng...
            </h1>
            <p className="text-gray-600 text-lg">
              Vui lòng đợi trong giây lát
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900 font-playfair">
              Giỏ hàng trống
            </h1>
            <p className="text-gray-600 text-lg">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Button asChild size="lg">
              <Link to="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-2">
            Giỏ hàng của bạn
          </h1>
          <p className="text-gray-600">
            Bạn có {items.length} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Sản phẩm ({items.length})
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa tất cả
              </Button>
            </div>

            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image ? getImageUrl(item.image) : 'https://via.placeholder.com/300x300?text=No+Image'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {typeof item.category === 'object' ? item.category.name : item.category}
                      </p>
                      <p className="text-lg font-bold text-[#0d6938] mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Tóm tắt đơn hàng
                </h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-[#0d6938]">Miễn phí</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                      <span className="text-lg font-bold text-[#0d6938]">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-[#0d6938] hover:bg-[#095127] text-white" size="lg">
                  Tiến hành thanh toán
                </Button>

                <Button asChild variant="outline" className="w-full mt-3">
                  <Link to="/products">Tiếp tục mua sắm</Link>
                </Button>

                {/* Guarantees */}
                <div className="mt-6 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#0d6938] rounded-full"></span>
                    <span>Miễn phí vận chuyển toàn quốc</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#0d6938] rounded-full"></span>
                    <span>Đổi trả miễn phí trong 7 ngày</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#0d6938] rounded-full"></span>
                    <span>Thanh toán an toàn 100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
