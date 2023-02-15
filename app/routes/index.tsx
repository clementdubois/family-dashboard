import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-gray-200">
      <h1>Dashboard famille Dubois</h1>
      <Link to="errands">Gestion course</Link>
    </main>
  );
}
