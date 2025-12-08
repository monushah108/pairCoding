import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Setup() {
  return (
    <div>
      <form>
        <FieldGroup>
          <FieldDescription>setup your profile</FieldDescription>

          <Field>
            <Button variant="outline">Save</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
