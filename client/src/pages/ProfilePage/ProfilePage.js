import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user, properties, isAuthValid }) {
  const navigate = useNavigate();
  console.log(user, isAuthValid, properties);

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <main>
      <h2>Profile</h2>
      <h3>{`${user.first_name} ${user.last_name}`}</h3>
      <p>admin properties</p>
    </main>
  );
}
