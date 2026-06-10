import React from 'react';

interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name = 'Guest User',
  age = 18,
  role = 'Subscriber',
}) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '10px 0' }}>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default UserCard;
