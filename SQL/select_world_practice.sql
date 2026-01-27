-- Active: 1769143443730@@127.0.0.1@5432@world@public
SELECT *  FROM city;
SELECT * FROM country;
SELECT name, continent FROM country;
SELECT c.name, c.gnp FROM country c;

SELECT c.name AS 국가명, c.population 인구수 FROM country c;
SELECT c.name AS 국가명, c.population "인구 수" FROM country c;

-- 인구가 800만 이상인 도시의 name, population을 조회하시오
SELECT c.name, c.population FROM city c
WHERE population >= 8000000;

-- 한국(KOR)에 있는 도시의 name, countrycode를 조회하시오
SELECT c.name, c.countrycode FROM city c
WHERE c.countrycode = 'KOR'; 

-- 유럽 대륙에 속한 나라들의 name과 region을 조회하시오.
SELECT c.name, c.region FROM country c
WHERE c.continent = 'Europe';

-- 이름이 'San'으로 시작하는 도시의 name을 조회하시오
SELECT c.name FROM city c 
WHERE name ILIKE 'san%';

-- 독립 연도(IndepYear)가 1900년 이후인 나라의 name, indepyear를 조회하시오.
SELECT c,name, c.indepyear FROM country c
WHERE Indepyear >= 1900;

-- 인구가 100만에서 200만 사이인 한국 도시의 name을 조회하시오
SELECT name FROM city
WHERE population BETWEEN  1000000 AND 2000000 AND countrycode = 'KOR';

-- 인구가 500만 이상인 한국, 일본, 중국의 도시의 name, countrycode, population 을 조회하시오
SELECT name ,countrycode,population FROM city
WHERE population >= 5000000 AND countrycode IN('KOR','JPN', 'CHN' ) ;

-- 도시 이름이 'A'로 시작하고 'a'로 끝나는 도시의 name을 조회하시오.
SELECT name FROM city
WHERE name LIKE 'A%' AND name LIKE'%a';

-- 동남아시아(Southeast Asia) 지역(Region)에 속하지 않는 아시아(Asia) 대륙 나라들의 name, region을 조회하시오.
SELECT name, region FROM country
WHERE continent = 'Asia' AND region != 'Southeast Asia';

-- 오세아니아 대륙에서 예상 수명의 데이터가 없는 나라의 name, lifeexpectancy, continent를 조회하시오.

SELECT name, lifeexpectancy, continent FROM country
WHERE continent = 'Oceania' AND lifeexpectancy IS NULL;
-- ORDER BY 문제
-- country 테이블에서 대륙별로 정렬하고, 같은 대륙 내에서는 GNP가 높은 순으로 정렬하여 name, continent, GNP을 조회하시오.
SELECT name, continent, gnp FROM country
ORDER BY continent, gnp DESC;
    
-- country 테이블에서 기대수명이 높은 순으로 정렬하되, NULL값은 마지막에 나오도록 정렬하여 name, lifeexpectancy을 조회하시오.
SELECT name, lifeexpectancy FROM country
ORDER BY lifeexpectancy DESC NULLS LAST;

-- LIMIT OFFSET 문제
-- city 테이블에서 인구수가 가장 적은 도시 5개를 조회하시오.
SELECT name, population FROM city 
ORDER BY population 
LIMIT 5;

-- country 테이블에서 면적(SurfaceArea)이 가장 넓은 순서대로 11위부터 20위까지의 국가를 조회하시오.
SELECT name, surfacearea FROM country
ORDER BY surfacearea DESC
LIMIT 10 OFFSET 10;

-- country 테이블에서 기대수명이 높은 순서대로 1위부터 5위까지의 국가를 조회하시오.
SELECT * FROM country
ORDER BY lifeexpectancy DESC
 NULLS LAST LIMIT 5;