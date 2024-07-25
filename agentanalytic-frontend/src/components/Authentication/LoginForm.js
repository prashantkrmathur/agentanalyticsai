import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';

const LoginForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.auth.error);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await dispatch(loginUser(values)).unwrap();
      if (response.token) {
        // Login successful
        message.success('Login successful!');
        onSuccess(); // Close modal or redirect
      } else {
        // Handle case where response does not contain a token
        message.error('Login failed: ' + (response.message || 'An error occurred.'));
      }
    } catch (error) {
      // Log the error to debug
      console.error('Login error:', error);

      // Handle specific error message if available
      const errorMessage = error.message || 'Login failed!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
