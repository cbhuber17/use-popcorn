import { useEffect } from "react";

export function useKey(key, action) {
  // DOM manipulation, close right box when key is pressed
  useEffect(
    function () {
      // Callback to check if key is pressed
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      // Cleanup to remove event listener
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
