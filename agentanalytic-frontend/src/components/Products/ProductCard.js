import React, { useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons'; // Import Ant Design Star Icon

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status } = useSelector((state) => state.product);
  const isAuthenticated = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleEdit = (id) => {
    if (isAuthenticated) {
      navigate(`/create-edit-product?id=${id}`);
    } else {
      alert('You need to be logged in to edit products.');
    }
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const renderRating = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarFilled
        key={index}
        style={{ color: index < rating ? 'yellow' : 'lightgray', fontSize: '16px' }}
      />
    ));
  };

  return (
    <Row gutter={16}>
      {products.map((product) => (
        <Col span={8} key={product.id}>
          <Card
            hoverable
            onClick={() => handleCardClick(product.id)} // Handle card click
            cover={
              <div style={cardImageWrapperStyle}>
                <img
                  alt={product.name}
                  src={product.image}
                  style={imageStyle}
                />
              </div>
            }
            actions={[
              isAuthenticated && (
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the Card
                    handleEdit(product.id);
                  }}
                >
                  Edit
                </Button>
              ),
            ]}
            style={cardStyle} // Apply card style with margin and padding
          >
            <Meta
              title={product.name}
              description={
                <>
                  <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    {product.description}
                  </Paragraph>
                  <Title level={4}>Price: ${product.price}</Title>
                  <Title level={5} type="danger">Discounted Price: ${product.discountedPrice}</Title>
                  <div>{renderRating(product.rating)}</div> {/* Display the rating */}
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const cardImageWrapperStyle = {
  width: '100%',
  height: '200px', 
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

export default ProductCard;
