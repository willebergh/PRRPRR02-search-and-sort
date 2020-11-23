const path = require("path");
const fs = require("fs");

class Stuff {
    constructor(nr, name, desc) {
        this.nr = nr;
        this.name = name;
        this.desc = desc;
    }

    // Metod för att jämföra olika objekt från klassen
    lt(other) {
        return this.nr < other.nr
    }

    // Metod för att jämföra olika objekt från klassen
    gt(other) {
        return this.nr > other.nr
    }

    // Metod för att skriva ut objekt från klassen
    str() {
        return `${this.nr}. ${this.name} - ${this.desc}`
    }
}

class Manager {
    constructor() {
        const randomStuffFile = path.join(__dirname, "random_stuff.txt");
        const file = fs.readFileSync(randomStuffFile, "utf-8");

        this.stuff = file.split("\n")
            .map(line => {
                const _ = line.split("|");
                return new Stuff(parseInt(_[0]), _[1], _[2]);
            })
    }

    print() {
        console.log(this.stuff);
    }

    linSearch(nr) {
        console.time("linSearch");
        for (var i = 0; i < this.stuff.length; i++) {
            if (this.stuff[i].nr === nr) {
                console.timeEnd("linSearch");
                return this.stuff[i]
            }
        }
    }

    binSearch(nr) {
        console.time("binSearch");
        const halving = list => {
            const middleIndex = (list.length / 2).toFixed(0);
            const middleItem = list[middleIndex];
            if (middleItem.nr === nr) {
                console.timeEnd("binSearch");
                return middleItem;
            } else if (middleItem.nr > nr) {
                return halving(list.slice(middleIndex, list.length));
            } else if (middleItem.nr < nr) {
                return halving(list.slice(0, middleIndex))
            }
        }

        return halving(this.stuff);
    }

    urvalSort() {
        for (var i = 0; i < this.stuff.length; i++) {
            for (var j = i; j < this.stuff.length; j++) {
                if (this.stuff[j].nr > this.stuff[i].nr) {
                    const a = this.stuff[j];
                    const b = this.stuff[i];
                    this.stuff[j] = b;
                    this.stuff[i] = a;
                }
            }
        }
    }

    bubbleSort() {
        var swapped = true;
        while (swapped) {
            swapped = false;
            for (var i = 0; i < this.stuff.length - 1; i++) {
                const a = this.stuff[i];
                const b = this.stuff[i + 1];
                if (a.nr > b.nr) {
                    this.stuff[i] = b;
                    this.stuff[i + 1] = a;
                    swapped = true;
                }
            }
        }
    }

}





const manager = new Manager();


const randomIndex = Math.floor(Math.random() * 96)
manager.urvalSort();
manager.binSearch(randomIndex);
manager.linSearch(randomIndex);