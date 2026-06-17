import type { EditorOverrides } from "./useEditorOverrides";

const STORAGE_KEY = "digital-vpiska-editor-overrides-v2";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function loadEditorOverrides(): EditorOverrides {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) {
      return {};
    }

    return Object.entries(parsed).reduce<EditorOverrides>((acc, [editId, override]) => {
      if (!isObject(override)) {
        return acc;
      }

      const nextOverride: EditorOverrides[string] = {};

      if (typeof override.text === "string") {
        nextOverride.text = override.text;
      }

      if (isObject(override.styles)) {
        nextOverride.styles = Object.entries(override.styles).reduce<Record<string, string>>((styleAcc, [key, value]) => {
          if (typeof value === "string") {
            styleAcc[key] = value;
          }
          return styleAcc;
        }, {}) as EditorOverrides[string]["styles"];
      }

      acc[editId] = nextOverride;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export function saveEditorOverrides(overrides: EditorOverrides) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides, null, 2));
}

export function clearEditorOverrides() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function exportEditorOverrides(overrides: EditorOverrides) {
  return JSON.stringify(overrides, null, 2);
}

export function importEditorOverrides(json: string) {
  const parsed = JSON.parse(json) as EditorOverrides;
  saveEditorOverrides(parsed);
  return parsed;
}
