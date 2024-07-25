import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import axios from '../../api/api'; // Import your axios instance
import { loginUser } from '../../redux/slices/authSlice'; // Import the login action

const SignupForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send POST request to the API
      const response = await axios.post('/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        mobile: values.mobile,
        email: values.email,
        password: values.password,
        profilePic: values.profilePic || '', // Handle optional profilePic
      });

      // Check if the response status is success
      if (response.status === 201) {
        // Automatically log in the user after successful signup
        const loginResponse = await dispatch(loginUser({
          email: values.email,
          password: values.password,
        })).unwrap();

        // Check if login was successful
        if (loginResponse.token) {
          message.success('Signup and login successful!');
          onSuccess(); // Close modal or redirect
        } else {
          // Handle login failure
          message.error('Login failed: ' + (loginResponse.message || 'An error occurred.'));
        }
      } else {
        // Handle case where status code is not 200/201
        message.error('Signup failed: ' + (response.data.message || 'An error occurred.'));
      }
    } catch (error) {
      // Log the error to debug
      console.error('Signup error:', error);

      // Handle specific error message if available
      const errorMessage = error.response?.data?.message || 'Signup failed!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="signup"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="mobile"
        label="Mobile Number"
        rules={[{ required: true, message: 'Please input your mobile number!' }]}
      >
        <Input />
      </Form.Item>
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
      <Form.Item
        name="profilePic"
        label="Profile Picture URL"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
