POST	/posts2
    게시글을 작성하는 기능이야.
    어떤 정보가 필요하지?
        title, content, user가 필요합니다.
        title, content -> user로부터 입력받아요
        user라는 정보는 어디서 올까? -> 로그인을 했따 라는 사실
            JWT를 가지고 있고, 요청할 때 전달하면 user라는 정보를 서버에 전달한것과 같다.

        create schema -> title, content만 필요하다.
            jwt도 함께 받아야 하겠다. -> 헤더로 받습니다.

        response schema -> title, content, user


GET	    /posts2
    - posts2를 여러 개 조회할 겁니다.
        response schema에서 뭘 보여줄지를 정해야함.
        listresponse -> id, title, user에 대한 정보를 보여줄것이다.

        repository에서 여러 개를 조회하는 로직이 필요하고.
            post - user는 N:1 관계, 즉 post의 입장에서는 1개의 user
            -> joinedload를 사용한다.

GET	    /posts2/{id}
    - 1개 가져온다.
        response shcame - id, title, user + content (comments같은거 만들어서 해도 됨)

        repository의 입장에서 봤을 때 N+1문제가 발생을 하여도, N이 1인 상황이라 크게 오래걸리거나 하지 않거든요?
        하지만, async와 같은 비동기 로직에서는 lazy loading을 허용하지 않음.
        -> 하나의 데이터를 가져올때도 eager loading을 고려하자!


PUT	    /posts2/{id}
    - 입력받는 데이터 : id, 
    post를 수정
        - id / title / content / user_id
        - post의 글쓴이 user를 새로 도입.
            해당 글을 작성한 유저가 맞는지 확인.
DELETE	/posts2/{id}
    - 여기도 마찬가지로 글쓴이만 지우도록 허용을 해줄겁니다.

내 글 조회
posts/users/user_id
    <- 게시글은 게시글인데, 특정 user가 작성한 글
posts/me
채택 : me/posts <- 나의 mypage같은 곳에서 조회를 하면 좋을 것 같은 url
    나에 대한 정보인데, 그것들 중에 "작성한 글"인 것 뿐

    1. 로그인이 무조건 필요할 것 같아요. 내가 누군지 알아야 하기 때문에
    posts에 대한 정보를 조회를 하면서 user를 같이 가져올 필요가 있을까?
        같이 가져오는 것이 디자인 통일성에 좋을 것 같긴 합니다.


특정 유저의 글 조회
posts/users/user_id
    남의 프로필같은 곳에 들어가서 조회하는 기능
posts?user_id=user_id
    검색을 하는데, 키워드가 user에 대한 정보인 기능.

채택 : users/user_id/posts
    남의 프로필같은 곳에 들어가서 조회하는 기능
    로그인이 반드시 필요하진 않습니다. user_id로 입력받기 때문에.
    다만, 로그인을 도입할 수는 있을겁니다.

