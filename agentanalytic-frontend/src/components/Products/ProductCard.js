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

  const renderRating = (rating) => {
    // Generate an array of stars based on the rating
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
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </Button>
              ),
            ]}
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

// Ensure the card container maintains the aspect ratio
const cardImageWrapperStyle = {
  width: '100%',
  height: '200px', // Adjust based on your design needs
  overflow: 'hidden',
};

// Adjust the image style to fit inside the wrapper without cropping
const imageStyle = {
  objectFit: 'contain',
  width: '100%',
  height: '100%',
};

export default ProductCard;
