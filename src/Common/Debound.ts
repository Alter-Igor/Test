let timer: number;

export function debounceFunction(func: () => void, wait: number): () => void {
    return function executedFunction() {
        const later = () => {
            clearTimeout(timer);
            func();
        };
        clearTimeout(timer);
        timer = window.setTimeout(later, wait) as unknown as number; // Cast to number if TypeScript complains
    };
}
 