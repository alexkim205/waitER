from collections import namedtuple
from operator import attrgetter
import bisect
import sys
'''                                                                                                                                                            
Interval scheduling for patients weighted on ESI                                                                                                               
'''

Patient = namedtuple('Patient', 'ID start_time end_time ESI')

# stores file in dictionary of named tuples                                                                                                                    
def make_list(file="/Users/Tongyu/hackathon/PennApps/data/ESI.inER.csv"):
    list = []
    with open(file) as f:
        content = f.readlines()
        content = [x.strip() for x in content]
    content.pop(0)
    for line in content:
        l = line.split(',')
        list.append(Patient(l[0][1:-1], l[2][1:-1], l[3][1:-1], l[4]))
    patients = sorted(list, key=attrgetter('ESI'))
    print(patients, flush=True)
    return patients

def add(patient, list):
    l = patient.split(',')
    new = Patient(l[0][1:-1], l[2][1:-1], l[3][1:-1], l[4])
    list.append(new)
    patients = sorted(list, key=attrgetter('ESI'))
    index = patients.index(new)
    print((index, patients), flush=True)

def remove(patient, list):
    l = patient.split(',')
    old = Patient(l[0][1:-1], l[2][1:-1], l[3][1:-1], l[4])
    list.remove(old)
    print(list, flush=True)

if __name__ == '__main__':
#    filename = "/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv"                                                                                    
     with open("/Users/Tongyu/hackathon/PennApps/data/ESI.reserve.csv") as f:
        content = f.readlines()
        content = [x.strip() for x in content]
     first = content[1]
     list = make_list()
     add(first, list)
