class Character {
    constructor(name = "Ẩn danh", type = "Chưa rõ") {
        this.name = name;
        this.type = type;
        this.level = 1;
        this.hp = 100;
        this.isLive = true;
    }
}

const player1 = new Character("Arthur", "Chiến binh");
const player2 = new Character("Gandalf", "Pháp sư");
const playerAnDanh = new Character(undefined, "Sát thủ");

console.log(player1);
console.log(player2);
console.log(playerAnDanh); 
