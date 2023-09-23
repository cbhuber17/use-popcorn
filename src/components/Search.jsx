import { useRef } from "react";
import { useKey } from "../useKey";

// Stateful component
export function Search({ query, setQuery }) {
  // Default for DOM elements
  const inputEl = useRef(null);

  // Don't do this for DOM access, use useRef() above
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  // Put the cursor over the search bar upon page load/render
  // useEffect is the place to use useRefs
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
