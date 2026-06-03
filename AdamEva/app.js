
class Apple {
    #weight;

    constructor() {
        this.#weight = 10;
    }

    getWeight() {
        return this.#weight;
    }

    decreaseWeight() {
        if (this.#weight > 0) {
            this.#weight--;
        }
    }

    isEmpty() {
        return this.#weight === 0;
    }
}


class Human {
    #name;
    #gender;
    #weight;

    constructor(name, gender, weight) {
        this.#name = name;
        this.#gender = gender;
        this.#weight = weight;
    }

    say(words) {
        console.log(`${this.#name} nói: "${words}"`);
    }

    eatApple(apple) {
        if (!apple.isEmpty()) {
            apple.decreaseWeight();
            this.#weight++;
            console.log(`${this.#name} đã ăn 1 miếng táo.`);
        } else {
            console.log(`Táo đã hết rồi, ${this.#name} không thể ăn thêm.`);
        }
    }

    checkAppleWeight(apple) {
        console.log(`Khối lượng quả táo hiện tại là: ${apple.getWeight()}`);
    }

    getName() { return this.#name; }
    getGender() { return this.#gender; }
    getWeight() { return this.#weight; }
}


const apple = new Apple();

const adam = new Human("Adam", "Nam", 70);
const eva = new Human("Eva", "Nữ", 45);

console.log("--- TRẠNG THÁI BAN ĐẦU ---");
console.log(`${adam.getName()} - Cân nặng: ${adam.getWeight()}`);
console.log(`${eva.getName()} - Cân nặng: ${eva.getWeight()}`);
console.log(`Quả táo nặng: ${apple.getWeight()}`);
console.log("---------------------------\n");

adam.say("Bà Eva ơi, quả táo này trông ngon quá!");
eva.say("Thế ông ăn thử trước một miếng đi!");

console.log("\n--- BẮT ĐẦU ĂN TÁO ---");

while (!apple.isEmpty()) {
    if (!apple.isEmpty()) {
        adam.eatApple(apple);
        console.log(`-> Cân nặng của Adam: ${adam.getWeight()}`);
        adam.checkAppleWeight(apple);
        console.log("");
    }

    if (!apple.isEmpty()) {
        eva.eatApple(apple);
        console.log(`-> Cân nặng của Eva: ${eva.getWeight()}`);
        eva.checkAppleWeight(apple);
        console.log("");
    }
}

console.log("--- KẾT THÚC KỊCH BẢN ---");
adam.say("Hết sạch táo rồi!");
console.log(`Cân nặng cuối cùng của Adam: ${adam.getWeight()}`);
console.log(`Cân nặng cuối cùng của Eva: ${eva.getWeight()}`);