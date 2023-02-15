import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Form, useLoaderData } from "@remix-run/react";
import { addProduct, getErrandsList } from "~/models/errands.server";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const item = formData.get("item");

  if (typeof item !== "string") return json({}, { status: 400 });

  await addProduct({ item });

  return redirect("");
}

export async function loader() {
  const errandsList = await getErrandsList();
  return json(errandsList);
}

export default function Index() {
  const errandsList = useLoaderData<typeof loader>();
  const [addItemOpened, setAddItemOpened] = useState(false);

  const handleClickOpen = () => {
    setAddItemOpened(true);
  };

  const handleClose = () => {
    setAddItemOpened(false);
  };

  return (
    <section className="inline-flex flex-col bg-white p-4">
      <h2>Liste de course</h2>
      <List>
        {errandsList.map((item) => (
          <ListItem key={item.id}>{item.item}</ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleClickOpen}>
        Ajouter un produit
      </Button>
      <Dialog open={addItemOpened} onClose={handleClose}>
        <Form method="post">
          <DialogTitle>Ajouter un produit</DialogTitle>
          <DialogContent>
            <TextField autoFocus name="item" label="Produit" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" onClick={handleClose}>
              Ajouter
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </section>
  );
}
