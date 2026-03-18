import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const goToNextPage = () => {
    setSearchParams({ page: page + 1 });
  };

  const goToPrevPage = () => {
    setSearchParams({ page: page - 1 });
  };

  useEffect(() => {
    console.log("페이지 이동!");
  }, [page]);

  return (
    <div>
      <p>현재 페이지: {page}</p>
      <button className="button" onClick={goToPrevPage} disabled={page <= 1}>
        이전
      </button>
      <button className="button" onClick={goToNextPage}>
        다음
      </button>
    </div>
  );
};

export default ProductList;
