import { useState, useEffect } from "react";

const useInView = (options) => {
  const [observerEntry, setObserverEntry] = useState({});
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => setObserverEntry(entry),
        options
      );
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [node, options]);

  return [setNode, observerEntry];
};

export default useInView;
