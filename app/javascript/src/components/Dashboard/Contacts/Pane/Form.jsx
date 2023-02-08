import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Pane, Toastr } from "neetoui";
import { Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { CONTACTS_FORM_VALIDATION_SCHEMA, ROLES } from "../constants";

const Form = ({ onClose, contact, setContacts }) => {
  const { t } = useTranslation();

  const handleSubmit = values => {
    setContacts(contacts => [
      ...contacts,
      {
        ...values,
        id: contacts.length,
        nameAndRole: {
          firstName: values.firstName,
          lastName: values.lastName,
          role: values.role,
        },
        created_at: new Date().toISOString(),
      },
    ]);
    Toastr.success(t("contacts.contactCreateSuccess"));
    onClose();
  };

  return (
    <Formik
      initialValues={contact}
      validationSchema={CONTACTS_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="w-full">
          <Pane.Body className="space-y-6">
            <div className="flex w-full">
              <Input
                required
                className="mr-4 w-full flex-grow-0"
                label={t("contacts.form.firstName")}
                name="firstName"
              />
              <Input
                required
                className="w-full flex-grow-0"
                label={t("contacts.form.lastName")}
                name="lastName"
              />
            </div>
            <Input
              required
              className="w-full flex-grow-0"
              label={t("contacts.form.email")}
              name="email"
            />
            <Select
              required
              className="w-full"
              label={t("contacts.form.role.title")}
              name="role"
              options={ROLES}
              placeholder={t("contacts.form.role.placeHolder")}
            />
          </Pane.Body>
          <Pane.Footer>
            <Button
              className="mr-3"
              disabled={isSubmitting}
              label="Save changes"
              loading={isSubmitting}
              style="primary"
              type="submit"
            />
            <Button label="Cancel" style="text" onClick={onClose} />
          </Pane.Footer>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
