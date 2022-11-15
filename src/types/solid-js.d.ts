import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
    interface Directives {
      clickOutside?: () => void;
    }

  }
}
