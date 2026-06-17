import { createContext, useContext, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";

export type EditableStyleKey =
  | "fontSize"
  | "fontWeight"
  | "lineHeight"
  | "letterSpacing"
  | "color"
  | "backgroundColor"
  | "paddingTop"
  | "paddingRight"
  | "paddingBottom"
  | "paddingLeft"
  | "marginTop"
  | "marginRight"
  | "marginBottom"
  | "marginLeft"
  | "borderRadius"
  | "width"
  | "maxWidth"
  | "gap"
  | "textAlign";

export interface EditorOverride {
  text?: string;
  styles?: Partial<Record<EditableStyleKey, string>>;
}

export type EditorOverrides = Record<string, EditorOverride>;

export interface EditableRegistration {
  defaultText?: string;
}

export interface EditorContextValue {
  isEnabled: boolean;
  selectedId: string | null;
  selectedElement: HTMLElement | null;
  overrides: EditorOverrides;
  savedOverrides: EditorOverrides;
  registrations: Record<string, EditableRegistration>;
  statusMessage: string | null;
  dirty: boolean;
  setEnabled: (enabled: boolean) => void;
  setSelected: (editId: string | null, element: HTMLElement | null) => void;
  updateOverride: (editId: string, nextOverride: EditorOverride) => void;
  registerEditable: (editId: string, registration: EditableRegistration) => void;
  save: () => void;
  resetSelected: () => void;
  resetAll: () => void;
  exportJson: () => void;
  openImport: () => void;
}

export const EditorContext = createContext<EditorContextValue | null>(null);

export function useEditorContext() {
  return useContext(EditorContext);
}

interface UseEditorOverridesOptions {
  text?: string;
}

export function useEditorOverrides(editId?: string, options: UseEditorOverridesOptions = {}) {
  const context = useEditorContext();

  useEffect(() => {
    if (!editId || !context || !import.meta.env.DEV) {
      return;
    }

    context.registerEditable(editId, { defaultText: options.text });
  }, [context, editId, options.text]);

  return useMemo(() => {
    if (!editId || !import.meta.env.DEV) {
      return {
        bind: {},
        style: undefined as CSSProperties | undefined,
        text: options.text,
      };
    }

    const override = context?.overrides[editId];

    return {
      bind: { "data-edit-id": editId } as const,
      style: override?.styles as CSSProperties | undefined,
      text: override?.text ?? options.text,
    };
  }, [context?.overrides, editId, options.text]);
}
