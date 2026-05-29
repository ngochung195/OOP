/**
 * HỆ THỐNG QUẢN LÝ NHÂN VẬT - PIXELDREAM (LEGACY CODE)
 */

class Hero {
    constructor(name, hp, damage) {
        this.name = name;
        this.hp = hp;
        this.damage = damage;
    }

    attack(target) {
        target.hp -= this.damage;

        if (target.hp < 0) {
            target.hp = 0;
        }

        console.log(`${this.name} tấn công ${target.name} gây ${this.damage} sát thương`);

        console.log(`${target.name} còn ${target.hp} HP`);
    }

    showInfo() {
        console.log("===== THÔNG TIN NHÂN VẬT =====");
        console.log(`Tên: ${this.name}`);
        console.log(`HP: ${this.hp}`);
        console.log(`Sát thương: ${this.damage}`);
    }
}

let arthur = new Hero("Arthur", 1000, 50);

let valhein = new Hero("Valhein", 800, 80);

arthur.showInfo();
valhein.showInfo();

console.log("===== BẮT ĐẦU TRẬN ĐÁNH =====")
while (arthur.hp > 0 && valhein.hp > 0) {
    arthur.attack(valhein);
    valhein.attack(arthur);
}
arthur.showInfo();
valhein.showInfo();
console.log("===== TRẬN ĐÁNH KẾT THÚC =====")
