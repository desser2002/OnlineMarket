export {};

declare global {
    interface Window {
        toast: (type: "success" | "error" | "warning", message: string) => void;
    }
}
