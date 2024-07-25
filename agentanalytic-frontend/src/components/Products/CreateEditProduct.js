import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, message } from 'antd';
import axios from '../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Option } = Select;

const CreateEditProduct = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const productId = query.get('id');
  const [selectedFields, setSelectedFields] = useState([]);
  const [productData, setProductData] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/product/${productId}`);
          setProductData(response.data.product);
          form.setFieldsValue(response.data.product);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [productId, form]);

  const handleFieldChange = (value) => {
    setSelectedFields(value);
  };

  const onFinish = async (values) => {
    const updateValues = selectedFields.reduce((acc, field) => {
      acc[field] = values[field];
      return acc;
    }, {});

    try {
      if (productId) {
        console.log('====================================');
        console.log(isAuthenticated);
        console.log('====================================');
        await axios.patch(`/product/update/${productId}`, updateValues, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        message.success('Product updated successfully');
      } else {
        await axios.patch(`/product/update/${productId}`, values, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        message.success('Product created successfully');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
      message.error('Error saving product');
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Select Fields to Update">
        <Select
          mode="multiple"
          placeholder="Select fields"
          onChange={handleFieldChange}
          style={{ width: '100%' }}
        >
          <Option value="name">Product Name</Option>
          <Option value="price">Price</Option>
          <Option value="description">Description</Option>
          <Option value="discountedPrice">Discounted Price</Option>
          <Option value="rating">Rating</Option>
          <Option value="quantity">Quantity</Option>
          <Option value="image">Image URL</Option>
        </Select>
      </Form.Item>

      {selectedFields.map((field) => (
        <Form.Item
          key={field}
          name={field}
          label={`Update ${field}`}
          rules={[{ required: true, message: `Please input the ${field}!` }]}
        >
          {field === 'description' ? (
            <Input.TextArea />
          ) : (
            <Input />
          )}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {productId ? 'Update Product' : 'Create Product'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEditProduct;
