import React, { useEffect } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons'; // Import Ant Design Star Icon

const { Meta } = Card;

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status } = useSelector((state) => state.product);
  const isAuthenticated = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Row gutter={16}>
      {products.map((product) => (
        <Col span={8} key={product.id}>
          <Card
            hoverable
            onClick={() => handleCardClick(product.id)}
            cover={
              <div style={cardImageWrapperStyle}>
                <img
                  alt={product.name}
                  src={product.image}
                  style={imageStyle}
                />
              </div>
            }
            style={cardStyle} // Apply card style with margin and padding
          >
            <Meta
              title={product.name}
              description={`$${product.price}`}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const cardImageWrapperStyle = {
  width: '100%',
  height: '200px', // Adjust based on your design needs
  overflow: 'hidden',
};

const imageStyle = {
  objectFit: 'contain',
  width: '100%',
  height: '100%',
};

const cardStyle = {
  margin: '16px',
  padding: '16px',
  borderRadius: '8px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
};

export default ProductList;
