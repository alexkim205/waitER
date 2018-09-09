from collections import namedtuple
from operator import attrgetter
import bisect
import random
import sys
<<<<<<< HEAD
'''
Interval scheduling for patients weighted on ESI
=======
'''                                                                                                                                                            
Interval scheduling for patients weighted on ESI                                                                                                               
>>>>>>> origin/scheduling
'''

Patient = namedtuple('Patient', 'ID start_time end_time duration ESI')

<<<<<<< HEAD
# stores file in dictionary of named tuples
=======
# stores file in dictionary of named tuples                                                                                                                    
>>>>>>> origin/scheduling
def make_list(file="/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv"):
    list = []
    with open(file) as f:
        content = f.readlines()
<<<<<<< HEAD
        content = [x.strip() for x in content] 
=======
        content = [x.strip() for x in content]
>>>>>>> origin/scheduling
    content.pop(0)
    for line in content:
        l = line.split(',')
        list.append(Patient(l[0][1:-1], l[2][1:-1], l[3][1:-1], random.randint(1,101), l[4]))
<<<<<<< HEAD
    patients = sorted(list, key=attrgetter('ESI', 'start_time'))
=======
    patients = sorted(list, key=attrgetter('ESI'))
>>>>>>> origin/scheduling
    print(patients, flush=True)

def schedule(patient, list):
    l = patient.split(',')
    list.append(Patient(l[0][1:-1], l[2][1:-1], l[3][1:-1], random.randint(1,101), l[4]))
<<<<<<< HEAD
    patients = sorted(list, key=attrgetter('ESI', 'start_time'))
    print(patients, flush=True)

if __name__ == '__main__':
#    filename = "/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv"
    make_list()


=======
    patients = sorted(list, key=attrgetter('ESI'))
    print(patients, flush=True)

if __name__ == '__main__':
#    filename = "/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv"                                                                                           
    make_list()
>>>>>>> origin/scheduling
