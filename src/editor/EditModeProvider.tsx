import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import EditorPanel from "./EditorPanel";
import "./editor.css";
import {
  EditorContext,
  type EditableRegistration,
  type EditorOverride,
  type EditorOverrides,
} from "./useEditorOverrides";
import {
  clearEditorOverrides,
  exportEditorOverrides,
  importEditorOverrides,
  loadEditorOverrides,
  saveEditorOverrides,
} from "./editorStorage";

function cloneOverrides(overrides: EditorOverrides) {
  return JSON.parse(JSON.stringify(overrides)) as EditorOverrides;
}

export function EditModeProvider({ children }: PropsWithChildren) {
  const [isEnabled, setEnabled] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [overrides, setOverrides] = useState<EditorOverrides>(() => loadEditorOverrides());
  const [savedOverrides, setSavedOverrides] = useState<EditorOverrides>(() => loadEditorOverrides());
  const [registrations, setRegistrations] = useState<Record<string, EditableRegistration>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const dirty = JSON.stringify(overrides) !== JSON.stringify(savedOverrides);

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setStatusMessage(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  useEffect(() => {
    document.body.dataset.editorEnabled = isEnabled ? "true" : "false";
    return () => {
      delete document.body.dataset.editorEnabled;
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!selectedElement || !isEnabled) {
      return;
    }

    selectedElement.dataset.editorSelected = "true";
    return () => {
      delete selectedElement.dataset.editorSelected;
    };
  }, [isEnabled, selectedElement]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (target.closest("[data-editor-ui='true']")) {
        return;
      }

      const editableElement = target.closest<HTMLElement>("[data-edit-id]");
      if (!editableElement) {
        setSelectedId(null);
        setSelectedElement(null);
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setSelectedId(editableElement.dataset.editId ?? null);
      setSelectedElement(editableElement);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isEnabled]);

  const registerEditable = useCallback((editId: string, registration: EditableRegistration) => {
    setRegistrations((current) => {
      if (current[editId]?.defaultText === registration.defaultText) {
        return current;
      }

      return { ...current, [editId]: registration };
    });
  }, []);

  const setSelected = useCallback((editId: string | null, element: HTMLElement | null) => {
    setSelectedId(editId);
    setSelectedElement(element);
  }, []);

  const updateOverride = useCallback((editId: string, nextOverride: EditorOverride) => {
    setOverrides((current) => {
      const next = cloneOverrides(current);
      const normalized: EditorOverride = {};

      if (typeof nextOverride.text === "string") {
        normalized.text = nextOverride.text;
      }

      if (nextOverride.styles && Object.keys(nextOverride.styles).length > 0) {
        normalized.styles = nextOverride.styles;
      }

      if (!normalized.text && !normalized.styles) {
        delete next[editId];
      } else {
        next[editId] = normalized;
      }

      return next;
    });
  }, []);

  const save = useCallback(() => {
    saveEditorOverrides(overrides);
    setSavedOverrides(cloneOverrides(overrides));
    setStatusMessage("Saved to localStorage");
  }, [overrides]);

  const resetSelected = useCallback(() => {
    if (!selectedId) {
      return;
    }

    setOverrides((current) => {
      const next = cloneOverrides(current);
      delete next[selectedId];
      saveEditorOverrides(next);
      setSavedOverrides(cloneOverrides(next));
      return next;
    });
    setStatusMessage(`Reset ${selectedId}`);
  }, [selectedId]);

  const resetAll = useCallback(() => {
    setOverrides({});
    setSavedOverrides({});
    clearEditorOverrides();
    setStatusMessage("All overrides cleared");
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([exportEditorOverrides(overrides)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "editor-overrides.json";
    link.click();
    window.URL.revokeObjectURL(url);
    setStatusMessage("JSON exported");
  }, [overrides]);

  const openImport = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const json = await file.text();
    const next = importEditorOverrides(json);
    setOverrides(next);
    setSavedOverrides(cloneOverrides(next));
    setStatusMessage("JSON imported");
    event.target.value = "";
  }, []);

  const contextValue = useMemo(
    () => ({
      isEnabled,
      selectedId,
      selectedElement,
      overrides,
      savedOverrides,
      registrations,
      statusMessage,
      dirty,
      setEnabled,
      setSelected,
      updateOverride,
      registerEditable,
      save,
      resetSelected,
      resetAll,
      exportJson,
      openImport,
    }),
    [
      dirty,
      exportJson,
      isEnabled,
      openImport,
      overrides,
      registerEditable,
      registrations,
      resetAll,
      resetSelected,
      save,
      savedOverrides,
      selectedElement,
      selectedId,
      setSelected,
      statusMessage,
      updateOverride,
    ],
  );

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
      <button
        type="button"
        className="editor-toggle"
        data-editor-ui="true"
        onClick={() => setEnabled(!isEnabled)}
      >
        {isEnabled ? "Exit edit mode" : "Edit mode"}
      </button>
      <EditorPanel />
      <input
        ref={importInputRef}
        data-editor-ui="true"
        hidden
        type="file"
        accept="application/json"
        onChange={handleImport}
      />
    </EditorContext.Provider>
  );
}
