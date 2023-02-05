import { getErrandsList } from "~/models/errands.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { List, ListItem } from "@mui/material";

export async function loader() {
  const errandsList = await getErrandsList();
  return json(errandsList);
}

export default function Index() {
  const errandsList = useLoaderData<typeof loader>();
  return (
    <main className="relative min-h-screen bg-gray-200">
      <h1>Dashboard famille Dubois</h1>
      <section className="inline-flex flex-col bg-white p-4">
        <h2>Liste de course</h2>
        <List>
          {errandsList.map((item) => (
            <ListItem key={item.id}>{item.item}</ListItem>
          ))}
        </List>
      </section>
    </main>
  );
}
