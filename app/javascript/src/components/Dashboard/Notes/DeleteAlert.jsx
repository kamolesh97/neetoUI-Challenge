import React, { useState } from "react";

import { Alert, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";

const DeleteAlert = ({
  onClose,
  setNotes,
  selectedNoteIds,
  setSelectedNoteIds,
}) => {
  const [deleting, setDeleting] = useState(false);

  const { t } = useTranslation();

  const handleDelete = () => {
    setDeleting(true);
    setNotes(notes => notes.filter(({ id }) => !selectedNoteIds.includes(id)));
    Toastr.success(
      t("notes.noteDeleteSuccess", { count: selectedNoteIds.length })
    );
    onClose();
    setSelectedNoteIds([]);
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message="Are you sure you want to continue? This cannot be undone."
      title={`Delete ${selectedNoteIds.length} ${
        selectedNoteIds.length > 1 ? "notes" : "note"
      }?`}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
