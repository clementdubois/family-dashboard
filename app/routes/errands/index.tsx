import { IconButton, List, ListItem, TextField } from "@mui/material";
import { Form, useLoaderData } from "@remix-run/react";
import {
  addProduct,
  deleteProduct,
  getErrandsList,
} from "~/models/errands.server";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Add, Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useEffect, useRef } from "react";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const commandName = formData.get("commandName");

  switch (commandName) {
    case "addItem":
      const item = formData.get("item");
      if (typeof item !== "string") return json({}, { status: 400 });
      await addProduct({ item });
    case "removeItem":
      const id = formData.get("id");
      if (typeof id !== "string") return json({}, { status: 400 });
      await deleteProduct({ id });
  }
  return redirect("");
}

export async function loader() {
  const errandsList = await getErrandsList();
  return json(errandsList);
}

export default function Index() {
  const errandsList = useLoaderData<typeof loader>();
  const addItemFormRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    addItemFormRef.current?.reset();
  }, [errandsList]);

  return (
    <section className="inline-flex flex-col bg-white p-4">
      <h2>Liste de course</h2>
      <Form ref={addItemFormRef} method="post">
        <TextField
          autoFocus
          name="item"
          label="Produit"
          variant="standard"
          size="small"
        />
        <IconButton
          aria-label="Ajouter"
          type="submit"
          name="commandName"
          value="addItem"
          color="success"
        >
          <Add />
        </IconButton>
      </Form>
      <List>
        {errandsList.map((item) => (
          <Form method="post" key={item.id}>
            <input type="hidden" name="id" value={item.id} />
            <ListItem>
              <IconButton
                aria-label="supprimer"
                sx={{ color: red[500] }}
                type="submit"
                name="commandName"
                value="removeItem"
              >
                <Delete />
              </IconButton>
              {item.item}
            </ListItem>
          </Form>
        ))}
      </List>
    </section>
  );
}
