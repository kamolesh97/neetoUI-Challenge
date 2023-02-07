import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";

import { NOTES_FORM_INITIAL_FORM_VALUES } from "../constants";

const Create = ({ setNotes, showPane, setShowPane }) => {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Create a new note
        </Typography>
      </Pane.Header>
      <Form
        note={NOTES_FORM_INITIAL_FORM_VALUES}
        setNotes={setNotes}
        onClose={onClose}
      />
    </Pane>
  );
};

export default Create;
