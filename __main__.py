import math
import random

class Stuff:
    def __init__(self, nr, name, desc):
        self.nr = nr
        self.name = name
        self.desc = desc
    
    # Metod för att jämföra olika objekt från klassen
    def __lt__(self, other):
        return self.nr < other.nr
    
    # Metod för att jämföra olika objekt från klassen
    def __gt__(self, other):
        return self.nr > other.nr
    
    # Metod för att skriva ut ett objekt från klassen
    def __str__(self):
        return f"#{self.nr}. {self.name} - {self.desc}"

class Manager():
    def __init__(self):
        self.stuff = []
        with open("random_stuff.txt", encoding="utf-8") as file:
            for line in file:
                line = line.strip().split("|")
                self.stuff.append(Stuff(int(line[0]), line[1], line[2]))
    
    def lin_search(self, nr):
        for i in self.stuff:
            if i.nr == nr:
                return i
    
    def bin_search(self, nr):
        def halving(list):
            middleIndex = math.trunc(len(list) / 2)
            middleItem = list[middleIndex]
            if middleItem.nr == nr:
                return middleItem
            elif middleItem.nr > nr:
                return halving(list[:middleIndex])
            elif middleItem.nr < nr:
                return halving(list[middleIndex:])

        return halving(self.stuff)
    
    def urval_sort(self):
        for i in range(len(self.stuff)):
            for j in range(len(self.stuff)):
                if self.stuff[j].__gt__(self.stuff[i]):
                    a = self.stuff[j]
                    b = self.stuff[i]
                    self.stuff[j] = b
                    self.stuff[i] = a
    
    def bubble_sort(self):
        swapped = True
        while swapped:
            swapped = False
            for i in range(len(self.stuff) - 1):
                a = self.stuff[i]
                b = self.stuff[i + 1]
                if a.__gt__(b):
                    self.stuff[i] = b
                    self.stuff[i + 1] = a
                    swapped = True



manager = Manager()

randomNumber = random.randint(0, len(manager.stuff) - 1)

print(manager.lin_search(randomNumber))
manager.urval_sort()
print(manager.bin_search(randomNumber))
