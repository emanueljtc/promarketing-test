'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/navigation';
import '../style.css';
import { Button } from '@/app/components';
import Link from 'next/link';
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: 'all',
  });

  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert('password not match');
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      router.push('/auth/login');
    }
  });

  return (
    <div className="content">
      <form onSubmit={onSubmit} className="form">
        <h1 className="title">Register</h1>
        <label htmlFor="username" className="label">
          Username:
        </label>
        <input
          type="text"
          {...register('username', {
            required: 'this field is required',
            maxLength: {
              value: 10,
              message: 'max length is 10',
            },
          })}
          className="input"
          placeholder="username"
        />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              return (
                <span key={type} className="error-message">
                  {message}
                </span>
              );
            })
          }
        />
        <label htmlFor="email" className="label">
          Email:
        </label>
        <input
          type="email"
          {...register('email', { required: 'this field is required' })}
          className="input"
          placeholder="l5lXK@example.com"
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              return (
                <span key={type} className="error-message">
                  {message}
                </span>
              );
            })
          }
        />
        <label htmlFor="password" className="label">
          Password:
        </label>
        <input
          type="password"
          {...register('password', { required: 'this field is required' })}
          className="input"
          placeholder="******"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              return (
                <span key={type} className="error-message">
                  {message}
                </span>
              );
            })
          }
        />

        <label htmlFor="confirmPassword" className="label">
          Confirm Password:
        </label>
        <input
          type="password"
          {...register('confirmPassword', { required: true })}
          className="input"
          placeholder="******"
        />
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              return (
                <span key={type} className="error-message">
                  {message}
                </span>
              );
            })
          }
        />
        <Button
          title="Register"
          variant="primary"
          type="submit"
          isDisabled={!isValid}
        />
        <Link href="/auth/login" className="link">
          Go to login
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;


