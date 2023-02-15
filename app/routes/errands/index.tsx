import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Form, useLoaderData } from "@remix-run/react";
import {
  addProduct,
  deleteProduct,
  getErrandsList,
} from "~/models/errands.server";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";

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
          <Form method="post">
            <input type="hidden" name="id" value={item.id} />
            <ListItem key={item.id}>
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
            <Button
              type="submit"
              onClick={handleClose}
              name="commandName"
              value="addItem"
            >
              Ajouter
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </section>
  );
}
