'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { signIn } from 'next-auth/react';
import '../style.css';
import { Button, MessageAlert } from '@/app/components';
import Link from 'next/link';
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: 'all',
  });
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
      setLoading(false);
    }
  });
  return (
    <div className="content">
      <form className="form" onSubmit={onSubmit}>
        {error && <MessageAlert message={error} type="danger" />}
        <h1 className="title">Login</h1>
        <label htmlFor="email" className="label">
          Email:{' '}
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="input"
          {...register('email', { required: 'this field is required' })}
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
          Password:{' '}
        </label>
        <input
          type="password"
          id="password"
          placeholder="******"
          className="input"
          {...register('password', { required: 'this field is required' })}
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
        <Button
          title={loading ? 'Loading...' : 'Login'}
          type="submit"
          isDisabled={!isValid || loading}
        />
        <Link href="/auth/register" className="link">
          Go to register
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;

