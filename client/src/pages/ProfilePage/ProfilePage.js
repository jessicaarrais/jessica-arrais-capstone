import { useState } from "react";

export default function ProfilePage({ user }) {
  return (
    <main>
      <h2>Profile</h2>
      {user && <p>admin properties</p>}
    </main>
  );
}
