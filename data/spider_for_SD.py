import requests
import re
from bs4 import BeautifulSoup
import json
fileFolder = 'F:/Code/py'

def countSum(wholeData):
    sum = 0
    toNumber = re.compile(r'\d+')
    for x in wholeData:
       # print(wholeData)
        #print(x)
       # if toNumber.match(x) != None:
        sum += int(toNumber.findall(x)[0])
    return sum

def solvePage(pageName,fileName):
    request = requests.get(pageName)

    content = request.text
    content = content.encode('ISO-8859-1')
    content = content.decode('utf-8')
    file = open(fileName,'w',encoding='utf-8')
    file.write(request.text)    
    #print(content)
    dataSet = {}
    #
    # solving confirmed
    #
    pattern = re.compile(r'(累计确诊病例\d+例|山东省累计报告新型冠状病毒感染的肺炎确诊病例\d+例)')
    result = pattern.findall(content)
    #print(result)
    dataSet['comfirmed'] = countSum(result)
    
    #
    #   solving suspected
    #
    pattern = re.compile(r'(现有疑似病例\d+例|目前有疑似病例\d+例)')
    result = pattern.findall(content)
    dataSet['suspected'] = countSum(result)

    #
    #  solving severe
    #
    pattern = re.compile(r'(含重症病例\d+例|含重症病例\d+例)')
    result = pattern.findall(content)
    dataSet['severe'] = countSum(result)

    #
    # solving death
    #
    pattern  = re.compile(r'死亡病例\d+例')
    result  = pattern.findall(content)
    dataSet['death'] = countSum(result)

    #
    # solving cured
    #
    pattern = re.compile(r'(出院\d+例|出院病例\d+例)')
    result = pattern.findall(content)
    dataSet['cured'] = countSum(result)
    return dataSet

def solveRoot(page,file):
    dataSet = {}
    request = requests.get(page)
    content = request.text.encode('ISO-8859-1')
    content = content.decode('utf-8')
    bs = BeautifulSoup(content,'lxml')
    #print(bs.find_all('a'))
    pageList = bs.find_all('a',title=re.compile(r'(\w+省新型冠状病毒肺炎疫情情况|\w+省新型冠状病毒感染的肺炎疫情情况)'))
    pattern = re.compile(r'\d+年\d+月\d+日')
    for x in pageList:
        realPage = page+'/.'+x.attrs['href']
        R = solvePage(realPage,'heheda.html')
        R['time'] = pattern.findall(x.attrs['title'])
        jsObj = json.dumps(R)
        file.write(jsObj)
        print(R)
    return dataSet

def solveMainRoot(page):
    #solveRoot(page)text
    request = requests.get(page)
    content = request.text.encode('ISO-8859-1')
    content = content.decode('utf-8')
    file = open('hehe.html','w',encoding='utf-8')
    file.write(content)
    file.close
    bs = BeautifulSoup(content,'lxml')
    print(content)
    result = bs.find_all('a',text='下一页')
    print(result)
    return
#result = solvePage('http://wsjkw.shandong.gov.cn/ztzl/rdzt/qlzhfkgz/tzgg/202002/t20200217_2579361.html','heheda.html')
#print(result)
#r = requests.get('http://wsjkw.shandong.gov.cn/ztzl/rdzt/qlzhfkgz/tzgg/index.html')

file = open('sd.json','w',encoding='utf-8')

solveRoot('http://wsjkw.shandong.gov.cn/ztzl/rdzt/qlzhfkgz/tzgg/index.html',file)
solveRoot('http://wsjkw.shandong.gov.cn/ztzl/rdzt/qlzhfkgz/tzgg/index_1.html',file)
solveRoot('http://wsjkw.shandong.gov.cn/ztzl/rdzt/qlzhfkgz/tzgg/index_2.html',file)
solveRoot('http://wsjkw.shandong.gov.cn/ztzl/rdzt/qlzhfkgz/tzgg/index_3.html',file)

file.close()