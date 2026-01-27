-- Active: 1769143443730@@127.0.0.1@5432@world@public
-- 어느 나라에 속한 도시인지
SELECT city.name AS 도시이름, country.name AS 나라이름 FROM city
JOIN country ON city.countrycode = country.code;

-- 국가와 그 국가의 공식 수도를 매칭


-- 특정 대륙에 속한 도시들 목록

-- 특정 대륙에서 인구가 500만 명 이상인 도시만 조회
SELECT city.name, country.name, country.continent 
FROM city
JOIN country ON city.countrycode = country.code
WHERE city.population >= 5000000 AND country.continent = 'Asia';

-- 국가와 수도, 공식언어 가져오기
SELECT ci.name, co.name, cl."Language"
FROM country co
JOIN city ci ON ci.id = co.capital
JOIN countrylanguage cl ON co.code = cl.countrycode
WHERE cl.isofficial = 'T';