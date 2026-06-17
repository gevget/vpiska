import React, { useMemo } from "react";
import type { ChangeEvent } from "react";
import { useEditorContext, type EditableStyleKey } from "./useEditorOverrides";

const STYLE_FIELDS: Array<{ key: EditableStyleKey; label: string; placeholder: string }> = [
  { key: "fontSize", label: "Font size", placeholder: "48px" },
  { key: "fontWeight", label: "Font weight", placeholder: "700" },
  { key: "lineHeight", label: "Line height", placeholder: "1.1" },
  { key: "letterSpacing", label: "Letter spacing", placeholder: "0.08em" },
  { key: "paddingTop", label: "Padding top", placeholder: "24px" },
  { key: "paddingRight", label: "Padding right", placeholder: "24px" },
  { key: "paddingBottom", label: "Padding bottom", placeholder: "24px" },
  { key: "paddingLeft", label: "Padding left", placeholder: "24px" },
  { key: "marginTop", label: "Margin top", placeholder: "24px" },
  { key: "marginRight", label: "Margin right", placeholder: "auto" },
  { key: "marginBottom", label: "Margin bottom", placeholder: "24px" },
  { key: "marginLeft", label: "Margin left", placeholder: "auto" },
  { key: "borderRadius", label: "Border radius", placeholder: "16px" },
  { key: "width", label: "Width", placeholder: "100%" },
  { key: "maxWidth", label: "Max width", placeholder: "640px" },
  { key: "gap", label: "Gap", placeholder: "24px" },
];

function rgbToHex(value: string) {
  if (!value || value.startsWith("#")) {
    return value || "#ffffff";
  }

  const match = value.match(/\d+/g);
  if (!match || match.length < 3) {
    return "#ffffff";
  }

  return `#${match
    .slice(0, 3)
    .map((part) => Number(part).toString(16).padStart(2, "0"))
    .join("")}`;
}

function InputField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (nextValue: string) => void;
}) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export default function EditorPanel() {
  const editor = useEditorContext();

  const selectedOverride = editor?.selectedId ? editor.overrides[editor.selectedId] : undefined;

  const computedStyles = useMemo(() => {
    if (!editor?.selectedElement) {
      return null;
    }

    return window.getComputedStyle(editor.selectedElement);
  }, [editor?.selectedElement]);

  if (!editor || !editor.isEnabled) {
    return null;
  }

  const { selectedId, selectedElement, registrations } = editor;
  const registration = selectedId ? registrations[selectedId] : undefined;

  const setStyleValue = (key: EditableStyleKey, nextValue: string) => {
    if (!selectedId) {
      return;
    }

    const nextStyles = { ...(selectedOverride?.styles ?? {}) };
    const trimmedValue = nextValue.trim();

    if (trimmedValue) {
      nextStyles[key] = trimmedValue;
    } else {
      delete nextStyles[key];
    }

    editor.updateOverride(selectedId, {
      ...selectedOverride,
      styles: nextStyles,
    });
  };

  const setTextValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedId) {
      return;
    }

    editor.updateOverride(selectedId, {
      ...selectedOverride,
      text: event.target.value,
    });
  };

  return (
    <aside className="editor-panel" data-editor-ui="true">
      <div className="editor-panel__header">
        <div>
          <p>Local Editor</p>
          <strong>{selectedId ?? "Select editable element"}</strong>
        </div>
        <button type="button" onClick={() => editor.setEnabled(false)}>
          Close
        </button>
      </div>

      <div className="editor-panel__body">
        <div className="editor-meta">
          <span>Unsaved: {editor.dirty ? "yes" : "no"}</span>
          <span>Element: {selectedElement?.tagName.toLowerCase() ?? "none"}</span>
        </div>

        {registration?.defaultText !== undefined && selectedId ? (
          <label className="editor-field">
            <span>Text</span>
            <textarea rows={4} value={selectedOverride?.text ?? registration.defaultText} onChange={setTextValue} />
          </label>
        ) : null}

        {selectedId ? (
          <>
            <div className="editor-field-grid">
              <label className="editor-field">
                <span>Alignment</span>
                <select
                  value={selectedOverride?.styles?.textAlign ?? computedStyles?.textAlign ?? "left"}
                  onChange={(event) => setStyleValue("textAlign", event.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </label>

              <label className="editor-field">
                <span>Color</span>
                <input
                  type="color"
                  value={rgbToHex(selectedOverride?.styles?.color ?? computedStyles?.color ?? "#ffffff")}
                  onChange={(event) => setStyleValue("color", event.target.value)}
                />
              </label>

              <label className="editor-field">
                <span>Background</span>
                <input
                  type="color"
                  value={rgbToHex(selectedOverride?.styles?.backgroundColor ?? computedStyles?.backgroundColor ?? "#000000")}
                  onChange={(event) => setStyleValue("backgroundColor", event.target.value)}
                />
              </label>
            </div>

            <div className="editor-field-grid">
              {STYLE_FIELDS.map((field) => (
                <React.Fragment key={field.key}>
                  <InputField
                    label={field.label}
                    placeholder={field.placeholder}
                    value={selectedOverride?.styles?.[field.key] ?? computedStyles?.[field.key] ?? ""}
                    onChange={(nextValue) => setStyleValue(field.key, nextValue)}
                  />
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <div className="editor-empty">Click any element with `data-edit-id` to edit it.</div>
        )}
      </div>

      <div className="editor-panel__footer">
        <button type="button" onClick={editor.save}>
          Save
        </button>
        <button type="button" onClick={editor.resetSelected} disabled={!selectedId}>
          Reset selected
        </button>
        <button type="button" onClick={editor.resetAll}>
          Reset all
        </button>
        <button type="button" onClick={editor.exportJson}>
          Export JSON
        </button>
        <button type="button" onClick={editor.openImport}>
          Import JSON
        </button>
      </div>

      {editor.statusMessage ? <div className="editor-status">{editor.statusMessage}</div> : null}
    </aside>
  );
}
