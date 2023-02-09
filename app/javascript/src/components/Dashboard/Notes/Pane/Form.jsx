import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Pane, Toastr } from "neetoui";
import { Input, Textarea } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { NOTES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ onClose, note, setNotes }) => {
  const { t } = useTranslation();

  const handleSubmit = values => {
    setNotes(notes => [...notes, { ...values, id: notes.length }]);
    Toastr.success(t("notes.noteCreateSuccess"));
    onClose();
  };

  return (
    <Formik
      initialValues={note}
      validationSchema={NOTES_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="w-full">
          <Pane.Body className="space-y-6">
            <Input
              required
              className="w-full flex-grow-0"
              label="Title"
              name="title"
            />
            <Textarea
              required
              className="w-full flex-grow-0"
              label="Description"
              name="description"
              rows={8}
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
            <Button
              label="Cancel"
              style="text"
              type="reset"
              onClick={onClose}
            />
          </Pane.Footer>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
