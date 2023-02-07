import React, { useState, useEffect } from "react";

import EmptyNotesListImage from "images/EmptyNotesList";
import { Delete } from "neetoicons";
import { Button, PageLoader } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import EmptyState from "components/commons/EmptyState";

import { DUMMY_NOTES } from "./constants";
import DeleteAlert from "./DeleteAlert";
import Menubar from "./MenuBar";
import NewNotePane from "./Pane/Create";
import Table from "./Table";

const Notes = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setNotes(DUMMY_NOTES);
      setLoading(false);
    }, 2000);
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
          title={t("notes.title")}
          actionBlock={
            <Button
              icon="ri-add-line"
              label="Add new note"
              size="small"
              onClick={() => setShowNewNotePane(true)}
            />
          }
          searchProps={{
            value: searchTerm,
            onChange: e => setSearchTerm(e.target.value),
          }}
        />
        {notes.length ? (
          <>
            <SubHeader
              rightActionBlock={
                <Button
                  disabled={!selectedNoteIds.length}
                  icon={Delete}
                  label="Delete"
                  size="small"
                  onClick={() => setShowDeleteAlert(true)}
                />
              }
            />
            <Table
              notes={notes}
              selectedNoteIds={selectedNoteIds}
              setSelectedNoteIds={setSelectedNoteIds}
            />
          </>
        ) : (
          <EmptyState
            image={EmptyNotesListImage}
            primaryAction={() => setShowNewNotePane(true)}
            primaryActionLabel="Add new note"
            subtitle="Add your notes to send customized emails to them."
            title="Looks like you don't have any notes!"
          />
        )}
        <NewNotePane
          setShowPane={setShowNewNotePane}
          showPane={showNewNotePane}
        />
        {showDeleteAlert && (
          <DeleteAlert
            selectedNoteIds={selectedNoteIds}
            setNotes={setNotes}
            setSelectedNoteIds={setSelectedNoteIds}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </>
  );
};

export default Notes;
