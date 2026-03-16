import { useRef, useEffect } from "react";

const SearchPage = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input className="input" ref={inputRef} placeholder="검색어를 입력하세요" />
  );
};

export default SearchPage;
