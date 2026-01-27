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
SELECT c.name, count(f.film_id) AS 영화수 FROM category c
JOIN film_category f ON f.category_id = c.category_id
GROUP BY c.category_id; 

--배우가 출연한 영화를 카테고리를 포함하여 조회
SELECT 
    a.first_name, 
    a.last_name, 
    f.title, 
    c.name 
FROM actor a
JOIN film_actor fa ON fa.actor_id = a.actor_id
JOIN film f ON f.film_id = fa.film_id
JOIN film_category fc ON fc.film_id = f.film_id
JOIN category c ON c.category_id = fc.category_id;


-- 출연 영화가 30편 이상인 배우
SELECT a.first_name, a.last_name, count(f.title) 출연영화수
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f ON f.film_id = fa.film_id
GROUP BY a.actor_id
HAVING count(f.title) >= 30
ORDER BY count(f.title) DESC;


-- 출연 배우가 10명 이상인 영화
SELECT * FROM


-- 1. 배우가 출연한 영화의 제목을 조회
    
    
-- 2. first_name이 `PENELOPE` 인 배우가 출연한 영화의 제목을 조회
    
    
-- 3. 영화 별 출연 배우의 수를 조회
    
    
-- 4. 영화 별 출연 배우의 수가 5가 넘는 데이터를 배우의 수가 큰순으로 조회
SELECT  film.title, COUNT(film_actor.actor_id)
FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
GROUP BY film.film_id
HAVING COUNT(film_actor.actor_id) >= 5
ORDER BY COUNT(film_actor.actor_id) DESC

-- 5. 고객의 대여 정보 조회

-- 6. 고객이 대여한 영화 정보 조회

-- 7. `YENTL IDAHO` 영화를 대여한 고객 정보 조회
SELECT  
    c.first_name, 
    c.last_name, 
    f.title,
    r.rental_date
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE f.title ILIKE 'YENTL IDAHO';


-- 8. 배우별로 출연한 영화의 등급(rating)을 조회
SELECT a.first_name, a.last_name, f.title, f.rating
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f ON fa.film_id = f.film_id
ORDER BY a.first_name;

-- 9. 1번 고객이 자주 대여한 영화의 카테고리를 찾으시오
SELECT 
    c.customer_id,
    c.first_name, 
    c.last_name, 
    ca.name,
    COUNT(ca.name) 
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON i.inventory_id = r.inventory_id
JOIN film f ON f.film_id = i.film_id
JOIN film_category fc ON fc.film_id = f.film_id
JOIN category ca ON fc.category_id = ca.category_id
WHERE c.customer_id = 1
GROUP BY c.customer_id, c.first_name, c.last_name, ca.name
ORDER BY rental_count DESC
LIMIT 1;

-- 10. 각 직원이 일하는 매장의 주소와 도시를 조회
SELECT
    s.first_name, 
    s.last_name, 
    ad.address, 
    c.city 
FROM staff s
JOIN store st ON s.store_id = st.store_id
JOIN address ad ON st.address_id = ad.address_id
JOIN  city c ON ad.city_id = c.city_id;

-- 11. 고객별로 대여한 영화 제목과 지불한 금액, 날짜를 조회
-- customer(고객) -> rental ->payment -> inventory -> film 
SELECT c.first_name, c.last_name, f.title, pay.amount, r.rental_date 
FROM  customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment pay ON r.rental_id = pay.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id;
-- GROUP BY c.customer_id, r.rental_id, f.film_id, pay.payment_id;

-- 12. 국가별 고객 수를 조회
SELECT 
    c.country, 
    count(cu.customer_id) AS 고객수
FROM country c
JOIN city ON c.country_id = city.country_id
JOIN address ad ON city.city_id = ad.city_id
JOIN customer cu ON ad.address_id = cu.address_id
GROUP BY c.country
ORDER BY c.country;

-- 13. `Action` 카테고리에 출연한 배우 조회
SELECT DISTINCT ca.name, a.first_name, a.last_name
FROM actor a 
JOIN film_actor fa ON fa.actor_id = a.actor_id
JOIN film f ON f.film_id = fa.film_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category ca ON ca.category_id = fc.category_id
WHERE ca.name = 'Action'

-- 14. 재고(inventory)가 없는 영화 찾기
SELECT f.title, i.inventory_id 
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL

-- 15. 카테고리별 평균 대여료
SELECT 
    cat.name, 
    AVG(f.rental_rate) AS 평균_대여_정가 -- f.rental_rate로 변경!
FROM category cat
JOIN film_category fc ON cat.category_id = fc.category_id
JOIN film f ON fc.film_id = f.film_id 
GROUP BY cat.category_id, cat.name
ORDER BY 평균_대여_정가 DESC;
