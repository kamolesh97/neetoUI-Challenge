import React, { useState, useEffect } from "react";

import EmptyContactsListImage from "images/EmptyNotesList";
import { Delete } from "neetoicons";
import { Button, PageLoader } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import EmptyState from "components/commons/EmptyState";

import DeleteAlert from "./DeleteAlert";
import Menubar from "./MenuBar";
import NewContactPane from "./Pane/Create";
import Table from "./Table";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [contacts, setContacts] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Menubar showMenu={isMenuOpen} />
      <Container>
        <Header
          menuBarToggle={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}
          title={t("contacts.title")}
          actionBlock={
            <Button
              icon="ri-add-line"
              label="Add new contact"
              size="small"
              onClick={() => setShowNewContactPane(true)}
            />
          }
          searchProps={{
            value: searchTerm,
            onChange: e => setSearchTerm(e.target.value),
          }}
        />
        {contacts.length ? (
          <>
            <SubHeader
              rightActionBlock={
                <Button
                  disabled={!selectedContactIds.length}
                  icon={Delete}
                  label="Delete"
                  size="small"
                  onClick={() => setShowDeleteAlert(true)}
                />
              }
            />
            <Table
              contacts={contacts}
              selectedContactIds={selectedContactIds}
              setSelectedContactIds={setSelectedContactIds}
            />
          </>
        ) : (
          <EmptyState
            image={EmptyContactsListImage}
            primaryAction={() => setShowNewContactPane(true)}
            primaryActionLabel="Add new contact"
            subtitle="Add your contacts to send customized notes to them."
            title="Looks like you don't have any contacts!"
          />
        )}
        <NewContactPane
          setContacts={setContacts}
          setShowPane={setShowNewContactPane}
          showPane={showNewContactPane}
        />
        {showDeleteAlert && (
          <DeleteAlert
            selectedContactIds={selectedContactIds}
            setContacts={setContacts}
            setSelectedContactIds={setSelectedContactIds}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </>
  );
};

export default Contacts;
