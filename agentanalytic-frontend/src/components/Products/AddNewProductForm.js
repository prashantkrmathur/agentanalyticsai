import React from 'react';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slices/productSlice';

// Define the ProductCategory enum
export const ProductCategory = {
  Electronics: "Electronics",
  Clothing: "Clothing",
  HomeAndKitchen: "Home & Kitchen",
  BeautyAndPersonalCare: "Beauty & Personal Care",
  SportsAndOutdoors: "Sports & Outdoors",
  ToysAndGames: "Toys & Games",
  Automotive: "Automotive",
  Books: "Books",
  FoodAndBeverages: "Food & Beverages",
  HealthAndWellness: "Health & Wellness"
};

const productCategoryOptions = Object.values(ProductCategory).map((category) => ({
  label: category,
  value: category
}));

const AddNewProductForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(addProduct(values)).then(() => {
      onSuccess();
    });
  };

  return (
    <Form
      name="add_new_product"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select the category!' }]}
      >
        <Select options={productCategoryOptions} />
      </Form.Item>
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please input the product name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Image URL"
        name="image"
        rules={[{ required: true, message: 'Please input the image URL!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Discounted Price"
        name="discountedPrice"
        rules={[{ required: true, message: 'Please input the discounted price!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: 'Please input the rating!' }]}
      >
        <InputNumber min={0} max={5} />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Please input the quantity!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewProductForm;
