import axios from "axios";
import React, { useState, useEffect } from "react";

const PostsJh = () => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `https://dummyjson.com/posts?limit=10&skip=${skip}`,
      );
      setPosts(response.data.posts);
    };

    fetchPosts();
  }, [skip]);

  const goFirst = () => {
    setSkip(0);
  };

  const goPrev = () => {
    skip === 0 ? alert("첫 페이지입니다.") : setSkip(skip - 10);
  };

  const goNext = () => {
    skip === 250 ? alert("마지막 페이지입니다.") : setSkip(skip + 10);
  };

  const goLast = () => {
    setSkip(250);
  };

  return (
    <div className="card">
      <div className="flex">
        {/* 괄호()를 제거하여 클릭 시에만 실행되도록 수정했습니다 */}
        <button className="button" onClick={goFirst}>
          처음으로
        </button>

        <button className="button" onClick={goPrev}>
          이전
        </button>

        <button className="button" onClick={goNext}>
          다음
        </button>

        <button className="button" onClick={goLast}>
          마지막으로
        </button>
      </div>

      {posts.map((post) => {
        return (
          <li key={post.id} className="card">
            <div>게시글번호 : {post.id}</div>
            <div>제목 : {post.title}</div>
            <div>작성자 : {post.userId}</div>
            <div>조회수 : {post.views}</div>
          </li>
        );
      })}
    </div>
  );
};

export default PostsJh;

// 간지버전(제미나이)
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const PostsJh = () => {
//   const [posts, setPosts] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const [selectedId, setSelectedId] = useState(null); // [추가] 클릭한 글 ID 저장용
//   const limit = 10;
//   const totalPosts = 250;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await axios.get(
//         `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
//       );
//       setPosts(response.data.posts);
//     };
//     fetchPosts();
//   }, [skip]);

//   // [함수] 클릭하면 열려있으면 닫고, 닫혀있으면 해당 ID를 엽니다.
//   const toggleDetail = (id) => {
//     setSelectedId(selectedId === id ? null : id);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
//       <h1 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">
//         FEED.
//       </h1>

//       {/* 상단 컨트롤러 */}
//       <div className="flex justify-between items-center mb-10 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//         <div className="flex gap-2">
//           <button
//             className="px-3 py-1.5 text-xs font-bold bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
//             onClick={() => setSkip(0)}
//           >
//             FIRST
//           </button>
//           <button
//             className="px-5 py-1.5 text-xs font-bold text-white bg-black rounded-lg hover:bg-gray-800 disabled:bg-gray-300"
//             onClick={() =>
//               skip === 0 ? alert("첫 페이지입니다.") : setSkip(skip - limit)
//             }
//           >
//             PREV
//           </button>
//         </div>

//         <span className="text-xs font-black text-gray-400">
//           PAGE <span className="text-black">{skip / limit + 1}</span> / 26
//         </span>

//         <div className="flex gap-2">
//           <button
//             className="px-5 py-1.5 text-xs font-bold text-white bg-black rounded-lg hover:bg-gray-800 disabled:bg-gray-300"
//             onClick={() =>
//               skip >= totalPosts
//                 ? alert("마지막 페이지입니다.")
//                 : setSkip(skip + limit)
//             }
//           >
//             NEXT
//           </button>
//           <button
//             className="px-3 py-1.5 text-xs font-bold bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
//             onClick={() => setSkip(totalPosts)}
//           >
//             LAST
//           </button>
//         </div>
//       </div>

//       {/* 리스트 구역 */}
//       <ul className="space-y-4">
//         {posts.map((post) => (
//           <li
//             key={post.id}
//             onClick={() => toggleDetail(post.id)} // 클릭 이벤트!
//             className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${
//               selectedId === post.id
//                 ? "bg-white border-blue-500 shadow-lg scale-[1.02]"
//                 : "bg-white border-transparent shadow-sm hover:border-gray-200"
//             }`}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
//                 NO. {post.id}
//               </span>
//               <span className="text-xs text-gray-400 font-medium">
//                 VIEW {post.views}
//               </span>
//             </div>

//             <h3
//               className={`text-lg font-bold transition-colors ${selectedId === post.id ? "text-blue-600" : "text-gray-800"}`}
//             >
//               {post.title}
//             </h3>

//             {/* [상세 내용] selectedId와 현재 post.id가 같을 때만 렌더링 */}
//             {selectedId === post.id && (
//               <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
//                 <p className="text-gray-600 leading-relaxed text-sm italic">
//                   "{post.body}"
//                 </p>
//                 <div className="mt-4 flex gap-2">
//                   {post.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PostsJh;
