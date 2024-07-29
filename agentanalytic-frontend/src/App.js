import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Button, Modal, Typography } from 'antd';
import { LoginOutlined, UserAddOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import ProductCard from './components/Products/ProductCard';
import ProductDetail from './components/Products/ProductDetail';
import CreateEditProduct from './components/Products/CreateEditProduct';
import AddNewProductForm from './components/Products/AddNewProductForm';
import LoginForm from './components/Authentication/LoginForm';
import SignupForm from './components/Authentication/SignupForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserProfile, logout } from './redux/slices/authSlice';

const { Header, Content } = Layout;
const { Text } = Typography;

const App = () => {
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    dispatch(fetchUserProfile());
  };

  return (
    <Router>
      <Layout>
        <Header>
          <div style={{ float: 'left' }}>
            {isAuthenticated ? (
              <>
                <Text style={{ color: 'white', marginRight: 16 }}>
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </Text>
                <Text style={{ color: 'white', marginRight: 16 }}>
                  {user ? user.email : 'Email'}
                </Text>
                <Text style={{ color: 'white', marginRight: 16 }}>
                  {user ? user.mobile : 'Mobile'}
                </Text>
                <Button
                  type="link"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  style={{ marginRight: 16 }}
                >
                  Logout
                </Button>
                marginRight: 16,
      backgroundColor: '#e6f7ff',
      border: '1px solid #91d5ff',
      color: '#1890ff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '5px 10px',
      borderRadius: '4px',
              </>
            ) : (
              <>
                <Button
                  type="link"
                  icon={<LoginOutlined />}
                  onClick={() => setIsLoginModalOpen(true)}
                  style={{ marginRight: 16 }}
                >
                  Login
                </Button>
                <Button
                  type="link"
                  icon={<UserAddOutlined />}
                  onClick={() => setIsSignupModalOpen(true)}
                >
                  Signup
                </Button>
              </>
            )}
          </div>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Routes>
            <Route path="/" element={<ProductCard />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {isAuthenticated && <Route path="/create-edit-product" element={<CreateEditProduct />} />}
          </Routes>
        </Content>
        <Modal
          title="Login"
          open={isLoginModalOpen}
          footer={null}
          onCancel={() => setIsLoginModalOpen(false)}
        >
          <LoginForm onSuccess={handleLoginSuccess} />
        </Modal>
        <Modal
          title="Signup"
          open={isSignupModalOpen}
          footer={null}
          onCancel={() => setIsSignupModalOpen(false)}
        >
          <SignupForm onSuccess={() => setIsSignupModalOpen(false)} />
        </Modal>
        <Modal
          title="Add New Product"
          open={isAddProductModalOpen}
          footer={null}
          onCancel={() => setIsAddProductModalOpen(false)}
        >
          <AddNewProductForm onSuccess={() => setIsAddProductModalOpen(false)} />
        </Modal>
      </Layout>
    </Router>
  );
};

export default App;
