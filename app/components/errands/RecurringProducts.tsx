import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import type { loader } from "~/routes/errands";
import { ErrandsCommand } from "~/routes/errands";
import { useRef } from "react";

export function RecurringProducts() {
  const addRecurringItemForm = useRef<Array<HTMLFormElement | null>>([]);
  const submitAddRecurringItem = useSubmit();
  const recurringProducts = useLoaderData<typeof loader>().recurringProducts;

  return (
    <section className="bg-white p-4">
      <Typography
        fontSize="x-large"
        component="h2"
        className="font-bold uppercase"
      >
        Produits récurrents
      </Typography>
      <Divider />
      <List>
        {recurringProducts.map((product, i) => {
          return (
            <>
              <ListItem disablePadding className="w-1 py-2">
                <Form
                  method="post"
                  key={product}
                  ref={(el) => (addRecurringItemForm.current[i] = el)}
                  className="w-full"
                >
                  <input type="hidden" name="item" value={product} />
                  <input
                    type="hidden"
                    name="commandName"
                    value={ErrandsCommand.AddItem}
                  />
                  <ListItemButton
                    onClick={() =>
                      submitAddRecurringItem(addRecurringItemForm.current[i])
                    }
                  >
                    <ListItemText primary={product} />
                  </ListItemButton>
                </Form>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </section>
  );
}
