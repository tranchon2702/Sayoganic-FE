// Lấy domain của backend từ biến môi trường hoặc sử dụng giá trị mặc định
const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN || 'http://localhost:5000';

/**
 * Chuyển đổi đường dẫn hình ảnh tương đối thành đường dẫn tuyệt đối
 * @param relativePath Đường dẫn tương đối của hình ảnh (ví dụ: /uploads/news/image.png)
 * @returns Đường dẫn tuyệt đối với domain của backend
 */
export const getImageUrl = (relativePath: string | undefined | null): string => {
  if (!relativePath) {
    // Trả về hình ảnh mặc định nếu không có đường dẫn
    return 'https://via.placeholder.com/400x300?text=No+Image';
  }

  // Nếu đường dẫn đã là URL đầy đủ (bắt đầu bằng http hoặc https), trả về nguyên vẹn
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Đảm bảo đường dẫn bắt đầu bằng /
  const normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  // Kết hợp domain backend với đường dẫn tương đối
  return `${BACKEND_DOMAIN}${normalizedPath}`;
};

export default getImageUrl; 