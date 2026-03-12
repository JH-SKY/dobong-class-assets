import React, { useState, useEffect } from "react";

// 1. [공통 옷장] 모든 버튼에 입힐 옷을 미리 준비해요.
// bg-blue-500(파랑 배경), rounded(둥근 모서리), m-1(버튼 간격) 등 '버튼스러움'을 정의합니다.
const buttoncss =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded m-1 text-sm";

const ProductList = () => {
  // 2. [상태 관리 그릇]
  const [products, setProducts] = useState([]); // 서버에서 받아온 상품 30개를 담을 바구니
  const [order, setOrder] = useState("asc"); // '올림/내림' 상태를 기억하는 메모장
  const [sortBy, setSortBy] = useState("id"); // '무엇을 기준으로?'를 기억하는 메모장
  const [loading, setLoading] = useState(false); // "지금 일하는 중!" 전광판 (true면 로딩 중)

  // 3. [배달원 함수] 서버에 가서 정렬된 데이터를 가져오는 핵심 로직
  const fetchSortedProducts = async () => {
    try {
      setLoading(true); // "배달 시작!" (화면에 로딩 메시지 띄우기)

      // [설계 의도] 주소창에 우리가 설정한sortBy, order 값을 쏙 끼워 넣습니다.
      // &limit=30 을 붙여서 서버에게 "딱 30개만 보내줘!"라고 협상합니다.
      const response = await fetch(
        `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}&limit=30`,
      );

      const data = await response.json(); // 서버가 준 상자를 열어서 내용물(JSON)을 꺼냅니다.
      setProducts(data.products); // 꺼낸 상품들을 우리 바구니(products)에 담습니다.
    } catch (error) {
      console.error("데이터 배달 중 사고 발생:", error);
    } finally {
      setLoading(false); // "배달 완료!" (성공하든 실패하든 로딩 전광판은 끕니다)
    }
  };

  // 4. [자동 비서] order나 sortBy 값이 바뀔 때마다 배달원을 자동으로 호출합니다.
  // 사용자가 버튼을 눌러서 상태가 변하면, 이 비서가 "어? 바뀌었네? 서버 다시 다녀와!"라고 시키는 거죠.
  useEffect(() => {
    fetchSortedProducts();
  }, [order, sortBy]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 상품 목록 (Top 30)</h1>

      {/* 5. [컨트롤 타워] 사용자의 주문을 받는 버튼 구역 */}
      <div className="bg-gray-100 p-3 rounded-lg mb-6">
        <p className="text-sm mb-2 text-gray-600 font-semibold">
          정렬 기준 선택:
        </p>
        <div className="flex flex-wrap">
          {/* 버튼 클릭 시 setSortBy와 setOrder를 동시에 바꿔서 '자동 비서'를 깨웁니다. */}
          <button
            className={buttoncss}
            onClick={() => {
              setSortBy("id");
              setOrder("asc");
            }}
          >
            ID ↑
          </button>
          <button
            className={buttoncss}
            onClick={() => {
              setSortBy("id");
              setOrder("desc");
            }}
          >
            ID ↓
          </button>
          <button
            className={buttoncss}
            onClick={() => {
              setSortBy("price");
              setOrder("asc");
            }}
          >
            가격 ↑
          </button>
          <button
            className={buttoncss}
            onClick={() => {
              setSortBy("price");
              setOrder("desc");
            }}
          >
            가격 ↓
          </button>
          <button
            className={buttoncss}
            onClick={() => {
              setSortBy("rating");
              setOrder("asc");
            }}
          >
            평점 ↑
          </button>
          <button
            className={buttoncss}
            onClick={() => {
              setSortBy("rating");
              setOrder("desc");
            }}
          >
            평점 ↓
          </button>
        </div>
      </div>

      {/* 6. [전시 구역] 로딩 상태에 따라 다른 화면을 보여줍니다. */}
      {loading ? (
        // 로딩 중일 때 보여줄 화면
        <div className="text-center py-10">상품을 정렬 중입니다...</div>
      ) : (
        // 로딩이 끝나면 상품 바구니를 map으로 돌려서 하나씩 예쁜 카드로 만듭니다.
        <div className="flex flex-wrap gap-4 justify-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-64 border p-4 rounded-xl shadow-sm bg-white"
            >
              {/* truncate는 글자가 너무 길면 '...'으로 줄여주는 실무 꿀팁! */}
              <h3 className="font-bold text-lg truncate">{product.title}</h3>
              <div className="text-gray-500 text-sm mt-2">
                <p>번호: {product.id}</p>
                <p className="text-blue-600 font-bold">
                  가격: ${product.price}
                </p>
                <p className="text-yellow-500">평점: ⭐ {product.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
