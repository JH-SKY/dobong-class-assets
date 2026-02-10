1. [POST] /users: 사용자 생성 (nickname 입력)
- user에 대한 create 로직
- nickname을 받기 위한 schema, UserCreate class
- user에 대한 response class

3. [POST] /users/{user_id}/wishlist/{product_id}: 위시리스트 추가 
 - 위시리스트에 대한 생성, 즉 WishList 테이블의 record 추가.
    1. WishList()를 만들고, 이것을 db.add 하는 방식.
        하나의 개별 테이블로 바라봐서, 레코드를 직접 생성.
    2. users.wishlists.append(WishList()) 하는 방식.
        user가 가지고 있는 연관테이블을 바탕으로 
        relationshiop을 활용해서 list에 append한것을
        Cascade, 즉 영속성 전이를 활용한 간접적인 방식.
    3. users.wishlist_items.append(product()) 하는 방식.
        wishlistItem : wishlist -> product로 가는 association proxy.