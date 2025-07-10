import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Newspaper, 
  LogOut, 
  Home, 
  User, 
  FolderTree,
  Tag
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const [openProducts, setOpenProducts] = useState(false);
  const [openNews, setOpenNews] = useState(false);

  const baseLinkClass = "flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors";
  const activeLinkClass = "bg-[#0d6938] text-white hover:bg-[#095127]";
  const subLinkClass = "flex items-center p-2 pl-11 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors";

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden admin-layout">
      <aside className="w-64 bg-white shadow-md flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-4 border-b">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src="/image/logo/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-xl text-[#0d6938]">Admin Panel</span>
          </NavLink>
        </div>
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </NavLink>

          {/* Sản phẩm và danh mục */}
          <Collapsible open={openProducts} onOpenChange={setOpenProducts} className="w-full">
            <CollapsibleTrigger className={`${baseLinkClass} w-full justify-between`}>
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3" />
                <span>Sản phẩm</span>
              </div>
              {openProducts ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-2">
              <NavLink
                to="/admin/products"
                className={({ isActive }) => `${subLinkClass} ${isActive ? activeLinkClass : ''}`}
              >
                <span>Danh sách sản phẩm</span>
              </NavLink>
              <NavLink
                to="/admin/categories"
                className={({ isActive }) => `${subLinkClass} ${isActive ? activeLinkClass : ''}`}
              >
                <span>Quản lý danh mục</span>
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          {/* Tin tức và danh mục */}
          <Collapsible open={openNews} onOpenChange={setOpenNews} className="w-full">
            <CollapsibleTrigger className={`${baseLinkClass} w-full justify-between`}>
              <div className="flex items-center">
                <Newspaper className="w-5 h-5 mr-3" />
                <span>Tin tức</span>
              </div>
              {openNews ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-2">
              <NavLink
                to="/admin/news"
                className={({ isActive }) => `${subLinkClass} ${isActive ? activeLinkClass : ''}`}
              >
                <span>Danh sách bài viết</span>
              </NavLink>
              <NavLink
                to="/admin/news-categories"
                className={({ isActive }) => `${subLinkClass} ${isActive ? activeLinkClass : ''}`}
              >
                <span>Quản lý danh mục</span>
              </NavLink>
            </CollapsibleContent>
          </Collapsible>
        </nav>
        <div className="p-4 border-t">
            <NavLink to="/" className={`${baseLinkClass} mb-2`}>
                <Home className="w-5 h-5 mr-3" />
                <span>Về trang chủ</span>
            </NavLink>
            <button onClick={logout} className={`${baseLinkClass} w-full text-red-500 hover:bg-red-50`}>
                <LogOut className="w-5 h-5 mr-3" />
                <span>Đăng xuất</span>
            </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 