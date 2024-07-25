import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Descriptions, Image, Spin } from 'antd';
import { fetchProductDetail } from '../../redux/slices/productSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, status } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return <Spin size="large" />;
  }

  if (!productDetail) return null;

  return (
    <Card title={productDetail.name}>
      <Image src={productDetail.image} />
      <Descriptions bordered>
        <Descriptions.Item label="Category">{productDetail.category}</Descriptions.Item>
        <Descriptions.Item label="Price">${productDetail.price}</Descriptions.Item>
        <Descriptions.Item label="Discounted Price">${productDetail.discountedPrice}</Descriptions.Item>
        <Descriptions.Item label="Description">{productDetail.description}</Descriptions.Item>
        <Descriptions.Item label="Rating">{productDetail.rating}</Descriptions.Item>
        <Descriptions.Item label="Quantity">{productDetail.quantity}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProductDetail;
