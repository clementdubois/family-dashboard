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
import { RecurringProducts } from "~/components/errands/RecurringProducts";

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
  const recurringProducts = [
    "sel",
    "poivre",
    "huile d'olive",
    "pastille lave vaisselle",
  ];

  return json({ errandsList, recurringProducts });
}

function ErrandsList() {
  return (
    <section className="bg-white p-4">
      <ErrandTitle />
      <Divider />
      <AddProduct />
      <ProductList />
    </section>
  );
}

export default function Index() {
  return (
    <div className="flex flex-wrap">
      <Paper className="m-5 mx-auto text-center md:w-1/2">
        <ErrandsList />
      </Paper>
      <Paper className="m-5 mx-auto text-center ">
        <RecurringProducts />
      </Paper>
    </div>
  );
}
