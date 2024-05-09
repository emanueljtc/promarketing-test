import React from 'react';

interface MessageAlertProps {
  message: string;
  type: 'success' | 'danger';
}

const MessageAlert: React.FC<MessageAlertProps> = ({
  message,
  type = 'success',
}) => {
  return (
    <div role="alert" className="my-4">
      <div
        className={`${
          type === 'success' ? 'bg-green-600' : 'bg-red-500'
        } text-white font-bold rounded-t px-4 py-2 text-2xl`}
      >
        {type === 'success' ? 'Success!' : 'Danger!'}
      </div>
      <div
        className={`border border-t-0 border-gray-200 rounded-b bg-slate-100 px-4 py-3 text-black text-2xl`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageAlert;

