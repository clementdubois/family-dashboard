import { Divider, Paper } from "@mui/material";
import {
  addProduct,
  deleteProduct,
  getErrandsList,
} from "~/models/errands.server";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { ProductList } from "~/components/errands/productList";
import { AddProduct } from "~/components/errands/addProduct";
import { ErrandTitle } from "~/components/errands/errandTitle";
import invariant from "tiny-invariant";

export enum ErrandsCommand {
  AddItem = "addItem",
  RemoveItem = "removeItem",
}

async function addItem(formData: FormData) {
  const item = formData.get("item") as string;
  invariant(item, "Un produit doit être renseigné");
  await addProduct({ item });
}

async function removeItem(formData: FormData) {
  const id = formData.get("id") as string;
  invariant(id, "Un produit doit être sélectionné");
  await deleteProduct({ id });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const commandName = formData.get("commandName");

  switch (commandName) {
    case ErrandsCommand.AddItem:
      await addItem(formData);
      break;
    case ErrandsCommand.RemoveItem:
      await removeItem(formData);
      break;
  }
  return redirect("");
}

export async function loader() {
  const errandsList = await getErrandsList();
  return json(errandsList);
}

export default function Index() {
  return (
    <Paper className="m-5 mx-auto text-center md:w-1/2">
      <section className="bg-white p-4">
        <ErrandTitle />
        <Divider />
        <AddProduct />
        <ProductList />
      </section>
    </Paper>
  );
}
