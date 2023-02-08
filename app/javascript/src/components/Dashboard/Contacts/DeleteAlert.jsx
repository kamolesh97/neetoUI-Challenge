import React, { useState } from "react";

import { Alert, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";

const DeleteAlert = ({
  onClose,
  setContacts,
  selectedContactIds,
  setSelectedContactIds,
}) => {
  const [deleting, setDeleting] = useState(false);

  const { t } = useTranslation();

  const handleDelete = () => {
    setDeleting(true);
    setContacts(contacts =>
      contacts.filter(({ id }) => !selectedContactIds.includes(id))
    );

    Toastr.success(
      t("contacts.contactDeleteSuccess", { count: selectedContactIds.length })
    );
    onClose();
    setSelectedContactIds([]);
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message="Are you sure you want to continue? This cannot be undone."
      title={`Delete ${selectedContactIds.length} ${
        selectedContactIds.length > 1 ? "contacts" : "contact"
      }?`}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
