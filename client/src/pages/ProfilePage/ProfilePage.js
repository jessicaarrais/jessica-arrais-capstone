import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user, isAuthValid }) {
  const navigate = useNavigate();
  console.log(user, isAuthValid);
  useEffect(() => {
    if (!isAuthValid) navigate("/");
  }, []);

  return (
    <main>
      <h2>Profile</h2>
      <h3>{`${user[0].first_name} ${user[0].last_name}`}</h3>
      <p>admin properties</p>
    </main>
  );
}
