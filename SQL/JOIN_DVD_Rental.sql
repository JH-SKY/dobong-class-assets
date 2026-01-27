-- Active: 1769143443730@@127.0.0.1@5432@dvdrental@public
-- 고객의 이름, 이메일 조회
SELECT c.last_name, c.email FROM customer c; 

-- 고객의 이름, 이메일, 주소 조회
SELECT c.last_name, c.email, a.address
FROM customer c
JOIN address a ON a.address_id = c.address_id; 

-- 고객의 이름, 이메일, 주소, 도시 조회


-- 고객의 이름, 이메일, 주소, 도시, 국가 조회



-- London(city)에 사는 고객의 이름, 이메일, 주소, 도시 조회


-- 도시별 고객 수 조회
--배우가 출연한 영화 조회
SELECT a.first_name, a.last_name, f.title 
FROM actor a
JOIN film_actor fa ON fa.actor_id = a.actor_id
JOIN film f ON f.film_id = fa.film_id
ORDER BY a.first_name DESC;

--배우별 출연 영화 수
SELECT a.first_name, a.last_name, count(f.title)
FROM actor a
LEFT JOIN film_actor fa ON fa.actor_id = a.actor_id
LEFT JOIN film f ON fa.film_id = f.film_id
GROUP BY a.actor_id 

SELECT a.first_name, a.last_name, count(f.title)
FROM actor a
JOIN film_actor fa ON fa.actor_id = a.actor_id
JOIN film f ON fa.film_id = f.film_id
WHERE a.first_name = 'Christian'
GROUP BY a.first_name, a.last_name
 ;


--영화 별 출연 배우 수
SELECT f.title, count(fa.actor_id) AS 출연배우수 
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
GROUP BY f.film_id;

--영화의 카테고리 정보
SELECT f.title, c.name    
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id

-- 카테고리 별 영화 수
SELECT * FROM


--배우가 출연한 영화를 카테고리를 포함하여 조회



-- 출연 영화가 30편 이상인 배우



-- 출연 배우가 10명 이상인 영화

-- 1. 배우가 출연한 영화의 제목을 조회
    
    
-- 2. first_name이 `PENELOPE` 인 배우가 출연한 영화의 제목을 조회
    
    
-- 3. 영화 별 출연 배우의 수를 조회
    
    
-- 4. 영화 별 출연 배우의 수가 5가 넘는 데이터를 배우의 수가 큰순으로 조회

-- 5. 고객의 대여 정보 조회

-- 6. 고객이 대여한 영화 정보 조회

-- 7. `YENTL IDAHO` 영화를 대여한 고객 정보 조회

-- 8. 배우별로 출연한 영화의 등급(rating)을 조회

-- 9. 1번 고객이 자주 대여한 영화의 카테고리를 찾으시오

-- 10. 각 직원이 일하는 매장의 주소와 도시를 조회

-- 11. 고객별로 대여한 영화 제목과 지불한 금액, 날짜를 조회

-- 12. 국가별 고객 수를 조회

-- 13. `Action` 카테고리에 출연한 배우 조회

-- 14. 재고(inventory)가 없는 영화 찾기

-- 15. 카테고리별 평균 대여료