import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Image } from 'antd';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return null;

  return (
    <Card title={product.name}>
      <Image src={product.image} />
      <Descriptions bordered>
        <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
        <Descriptions.Item label="Price">${product.price}</Descriptions.Item>
        <Descriptions.Item label="Discounted Price">${product.discountedPrice}</Descriptions.Item>
        <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
        <Descriptions.Item label="Rating">{product.rating}</Descriptions.Item>
        <Descriptions.Item label="Quantity">{product.quantity}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProductDetail;
