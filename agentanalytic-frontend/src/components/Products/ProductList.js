import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Row gutter={16}>
      {products.map(product => (
        <Col span={8} key={product.id}>
          <Card
            cover={<img alt={product.name} src={product.image} />}
            actions={[
              <Link to={`/product/${product.id}`}>
                <Button type="primary">View Details</Button>
              </Link>
            ]}
          >
            <Meta title={product.name} description={`$${product.price}`} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
