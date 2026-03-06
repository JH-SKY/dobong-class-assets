import React from "react";

const MenuList = () => {
    
  const menu = [
    { name: "떡볶이", price: 4000 },
    { name: "순대", price: 3500 },
    { name: "튀김", price: 2000 },
  ];

  //   const content = menu.map((item) => {
  //     return (
  //       <li>
  //         {item.name} : {item.price}원
  //       </li>
  //     );
  //   });
  return (
    <>
      <h2>메뉴 목록</h2>
      <ul>
        <li>
          {menu[0].name} : {menu[0].price}원
        </li>
        <li>
          {menu[1].name} : {menu[1].price}원
        </li>
        <li>
          {menu[2].name} : {menu[2].price}원
        </li>
        {/* {content} */}
      </ul>
    </>
  );
};

export default MenuList;
