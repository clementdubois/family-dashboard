import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ErrandsCommand } from "~/routes/errands";

export function AddProduct() {
  const transition = useTransition();
  const addItemFormRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    addItemFormRef.current?.reset();
  }, [transition]);
  return (
    <Form ref={addItemFormRef} method="post" className="p-10">
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
        value={ErrandsCommand.AddItem}
        color="success"
      >
        <Add />
      </IconButton>
    </Form>
  );
}
