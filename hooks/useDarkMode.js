import {useCallback, useSyncExternalStore} from "react";

const STORAGE_KEY = "darkMode";
const listeners = new Set();

const read = () => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === null ? null : JSON.parse(stored);
    } catch {
        return null;
    }
};

const subscribe = (listener) => {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
};

export default function useDarkMode(initialValue) {
    const getSnapshot = () => read() ?? initialValue;
    const value = useSyncExternalStore(subscribe, getSnapshot, () => initialValue);

    const toggle = useCallback(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(!(read() ?? initialValue)));
        } catch {}
        listeners.forEach((listener) => listener());
    }, [initialValue]);

    return {value, toggle};
}
