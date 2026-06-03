class Rat {
    constructor(name, weight, speed) {
        this.name = name;
        this.weight = weight;
        this.speed = speed;
        this.status = true;
    }

    keu() {
        console.log('Chít chít');
    }
}

class Cat {
    constructor(name, weight, maxSpeed) {
        this.name = name;
        this.weight = weight;
        this.maxSpeed = maxSpeed;
    }

    keu() {
        console.log('Meo meo');
    }

    batChuot(chuot) {
        if (!chuot.status) {
            console.log('Chuột đã chết không thèm bắt.');
            return false;
        }

        if (this.maxSpeed > chuot.speed) {
            console.log('Mèo đã bắt được chuột.');
            return true;
        } else {
            console.log('Mèo không bắt được chuột.');
            return false;
        }
    }

    anChuot(chuot, daBatDuoc) {
        if (daBatDuoc && chuot.status) {
            console.log('Mèo ăn chuột.');
            chuot.status = false;
            this.weight += chuot.weight;
            console.log(`Khối lượng của mèo hiện tại là: ${this.weight}kg`);
        } else if (!chuot.status) {
            console.log('Không ăn chuột chết.');
        } else {
            console.log('Không bắt được chuột để ăn.');
        }
    }
}


// === CHƯƠNG TRÌNH MÔ PHỎNG ===
let meo = new Cat("Mèo Tom", 15, 20);
let chuotNhanh = new Rat("Chuột Jerry", 2, 25); // Chuột chạy nhanh hơn mèo
let chuotCham = new Rat("Chuột Mickey", 1, 10);  // Chuột chạy chậm hơn mèo

// Tiếng kêu chào sân
meo.keu();
chuotNhanh.keu();

// KỊCH BẢN 1: Mèo đuổi chuột chạy nhanh (Jerry)
console.log(`--- Tình huống 1: Mèo đuổi chuột nhanh ---`);
let ketQua1 = meo.batChuot(chuotNhanh);
meo.anChuot(chuotNhanh, ketQua1);

// KỊCH BẢN 2: Mèo đuổi chuột chạy chậm (Mickey)
console.log(`--- Tình huống 2: Mèo đuổi chuột chậm ---`);
let ketQua2 = meo.batChuot(chuotCham);
meo.anChuot(chuotCham, ketQua2);