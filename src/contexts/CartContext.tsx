import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [localItems, setLocalItems] = useLocalStorage<CartItem[]>('cart-items', []);
  const [serverItems, setServerItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Lấy giỏ hàng từ server khi đăng nhập
  useEffect(() => {
    const fetchCartFromServer = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        try {
          console.log('CartContext: Lấy giỏ hàng từ máy chủ');
          const response = await api.get('/cart');
          console.log('CartContext: Nhận giỏ hàng từ máy chủ', response.data);
          setServerItems(response.data);
        } catch (error) {
          console.error('CartContext: Lỗi khi lấy giỏ hàng từ máy chủ:', error);
          toast.error('Không thể tải giỏ hàng từ máy chủ.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCartFromServer();
  }, [isAuthenticated, user]);

  // Lấy items phù hợp dựa vào trạng thái đăng nhập
  const items = isAuthenticated ? serverItems : localItems;

  const addToCart = async (newItem: CartItem) => {
    // Hiển thị toast ngay lập tức
    toast.info(`Đang thêm "${newItem.name}" vào giỏ hàng...`);

    if (isAuthenticated) {
      // Thêm vào giỏ hàng server
      try {
        setIsLoading(true);
        await api.post('/cart/add', {
          productId: newItem.id,
          quantity: newItem.quantity
        });
        
        // Tải lại giỏ hàng từ máy chủ để đảm bảo đồng bộ
        const response = await api.get('/cart');
        setServerItems(response.data);
        toast.success(`Đã thêm "${newItem.name}" vào giỏ hàng thành công!`);

      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng.';
        console.error('CartContext: Lỗi khi thêm vào giỏ hàng:', error);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Thêm vào giỏ hàng local
      const updatedItems = [...localItems];
      const existingItemIndex = updatedItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        updatedItems.push(newItem);
      }
      
      setLocalItems(updatedItems);
      toast.success(`Đã thêm "${newItem.name}" vào giỏ hàng!`);
    }
  };

  const removeFromCart = async (id: string) => {
    if (isAuthenticated) {
      // Xóa khỏi giỏ hàng server
      try {
        setIsLoading(true);
        console.log('CartContext: Xóa sản phẩm khỏi giỏ hàng trên máy chủ', id);
        await api.post('/cart/remove', { productId: id });
        
        // Cập nhật state sau khi xóa thành công
        const updatedItems = serverItems.filter(item => item.id !== id);
        setServerItems(updatedItems);
      } catch (error) {
        console.error('CartContext: Lỗi khi xóa khỏi giỏ hàng:', error);
        toast.error('Không thể xóa sản phẩm khỏi giỏ hàng');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Xóa khỏi giỏ hàng local
      const updatedItems = localItems.filter(item => item.id !== id);
      setLocalItems(updatedItems);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (isAuthenticated) {
      // Cập nhật giỏ hàng server
      try {
        setIsLoading(true);
        console.log('CartContext: Cập nhật số lượng sản phẩm trên máy chủ', id, quantity);
        await api.post('/cart/update', {
          productId: id,
          quantity
        });
        
        // Cập nhật state sau khi cập nhật thành công
        const updatedItems = serverItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        setServerItems(updatedItems);
      } catch (error) {
        console.error('CartContext: Lỗi khi cập nhật giỏ hàng:', error);
        toast.error('Không thể cập nhật số lượng sản phẩm');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Cập nhật giỏ hàng local
      const updatedItems = localItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      setLocalItems(updatedItems);
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      // Xóa giỏ hàng server
      try {
        setIsLoading(true);
        console.log('CartContext: Xóa toàn bộ giỏ hàng trên máy chủ');
        await api.post('/cart/clear');
        setServerItems([]);
      } catch (error) {
        console.error('CartContext: Lỗi khi xóa giỏ hàng:', error);
        toast.error('Không thể xóa giỏ hàng');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Xóa giỏ hàng local
      setLocalItems([]);
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
