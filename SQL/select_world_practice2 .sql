### 실습

-- 대륙별 총 인구수를 구하시오.
SELECT continent, sum(population) as 총인구
FROM country
GROUP BY continent;

-- 대륙별 평균 GNP와 평균 인구를 구하시오.
SELECT continent,
    ROUND(AVG(population))  AS 인구평균,
    ROUND(AVG(gnp))         AS GNP평균
FROM country
GROUP BY continent;

-- 인구가 50만에서 100만 사이인 도시들에 대해, District별 도시 수를 구하시오.
SELECT district,count(*) FROM city
WHERE population BETWEEN 500000 AND 1000000
GROUP BY district
ORDER BY count(*) DESC;
-- 아시아 대륙 국가들의 Region별 총 GNP를 구하세요.
SELECT region, sum(gnp) as 총GNP
FROM country
WHERE continent = 'Asia'
GROUP BY region;

-- - 대륙 별 국가 수가 많은 순서대로 Continent, 국가 수를 조회하시오.
SELECT continent, count(*) 
FROM country
GROUP BY continent
ORDER BY count(*) DESC;

-- - 독립년도가 있는 국가들의 대륙 별 평균 기대수명이 높은 순서대로 Continent, 평균 기대수명을 조회하시오.
SELECT continent, ROUND(AVG(lifeexpectancy)) AS 평균_기대수명
FROM country
WHERE indepyear IS NOT NULL
GROUP BY continent
ORDER BY AVG(lifeexpectancy) DESC;

-- GNP가 가장 높은 Region를 찾으시오.(GNP : 국민 총 생산)
SELECT region, SUM(gnp) FROM country
GROUP BY region
ORDER BY SUM(gnp) DESC
LIMIT 1;

-- - 각 국가별 도시가 10개 이상인 국가의 CountryCode, 도시 수를 조회하시오.
SELECT countrycode, COUNT(*) FROM city
GROUP BY countrycode
HAVING COUNT(*) >= 10;

-- - District별 평균 인구가 100만 이상이면서 도시 수가 3개 이상인 District,  도시 수, 총 인구를 구하시오

SELECT district,COUNT(*) AS "도시 수", SUM(population) AS "총 인구" 
FROM city
GROUP BY district
HAVING AVG(population) >= 1000000 
    AND COUNT(*) >= 3;

-- - 아시아 대륙의 국가들 중에서, Region별 평균 GNP가 1000 이상인 Region,  평균 GNP를 조회하시오
SELECT region, ROUND(AVG(gnp)) AS "평균 GNP" 
FROM country
WHERE continent = 'Asia'
GROUP BY region
HAVING AVG(gnp) >= 1000;

-- - 독립년도가 1900년 이후인 국가들 중에서, 대륙별 평균 기대수명이 70세 이상인 Continent, 평균 기대수명을 조회하시오.
SELECT continent, AVG(lifeexpectancy) FROM country
WHERE indepyear >= 1900
GROUP BY continent
HAVING AVG(lifeexpectancy) >= 70;
-- - CountryCode별 도시 평균 인구가 100만 이상이고, CountryCode별 도시 최소 인구가 50만 이상인 데이터에서 CountryCode, 총 도시수, 총 인구수를 조회하시오. - city
SELECT countrycode, count(*) AS "총 도시수", sum(population) AS "총 인구수" FROM city
GROUP BY countrycode
HAVING AVG(population) >= 1000000 AND MIN(population) > 500000 ;

-- - 인구가 50만 이상인 city들의 평균 인구가 100만 이상 인 국가의 CountryCode, 총 도시수, 총 인구수를 조회하시오.
SELECT countrycode, count(*) AS "총 도시수", SUM(population) AS "총 인구수" FROM city
WHERE population >= 500000
GROUP BY countrycode
HAVING AVG(population)>= 1000000;