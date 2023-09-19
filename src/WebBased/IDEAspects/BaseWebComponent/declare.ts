import { ASMaterialShared } from "./ASBaseStyles";

declare module 'preact/src/jsx' {
    namespace JSXInternal {

        // We're extending the IntrinsicElements interface which holds a kv-list of
        // available html-tags.
        interface IntrinsicElements {
            'as-material-shared': unknown;
        }
    }
}