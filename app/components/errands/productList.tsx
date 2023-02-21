import { useRef } from "react";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { Chip, List, ListItem } from "@mui/material";
import type { loader } from "~/routes/errands";
import { ErrandsCommand } from "~/routes/errands";

export function ProductList() {
  const deleteForms = useRef<Array<HTMLFormElement | null>>([]);
  const submitDelete = useSubmit();
  const errandsList = useLoaderData<typeof loader>();
  return (
    <List className="grid grid-cols-4">
      {errandsList.map((item, i) => (
        <Form
          method="post"
          key={item.id}
          ref={(el) => (deleteForms.current[i] = el)}
        >
          <input type="hidden" name="id" value={item.id} />
          <input
            type="hidden"
            name="commandName"
            value={ErrandsCommand.RemoveItem}
          />
          <ListItem disablePadding className="py-2">
            <Chip
              label={item.item}
              onDelete={() => submitDelete(deleteForms.current[i])}
            />
          </ListItem>
        </Form>
      ))}
    </List>
  );
}
