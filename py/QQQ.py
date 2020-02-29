import csv
file = open('F:\\2019-nCov_data_visualization\\py/DXYArea.csv')
reader = csv.reader(file)
print(list(reader))