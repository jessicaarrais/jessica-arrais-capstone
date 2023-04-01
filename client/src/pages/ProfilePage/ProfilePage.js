import { useState } from "react";

export default function ProfilePage() {
  const [hasListerPrivileges, setHasLenderPrivileges] = useState(true);

  return (
    <main>
      <h2>Profile</h2>
      {hasListerPrivileges && <p>admin properties</p>}
    </main>
  );
}
