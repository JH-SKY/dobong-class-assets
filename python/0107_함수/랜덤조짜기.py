names_ls = [
    '강성신', '김수왕', '김아네스', '김진우', '남건우', 
    '박세형', '박지훈', '배은하', '사비카', '서현석', 
    '이상준', '이상호', '이종혁', '이지선', '이채훈', 
    '주현지', '최유리', '하재연', '한다솔', '황희연'
    ]

from random import *
def make_group(names, size=4):
    names = names[:]
    shuffle(names)
    lst = {}
    group_number = 1
    for i in range(0, len(names), size):
        lst[str(group_number)+"조"] = names[i:i+size]
        print(group_number, "조 :", ", ".join(names[i:i+size]))
        group_number += 1
    return lst


make_group(names_ls)
