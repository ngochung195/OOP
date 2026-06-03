/**
 * THANH TOÁN TECHWALLET (LEGACY CODE)
 */

class SecureWallet {
    #balance = 0;

    deposit(amount) {
        if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
            console.error("Giao dịch thất bại: Số tiền nạp không hợp lệ.");
            return false;
        }

        this.#balance += amount;
        console.log(`Nạp thành công: +${amount}. Số dư hiện tại: ${this.#balance}`);
        return true;
    }

    withdraw(amount) {
        if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
            console.error("Giao dịch thất bại: Số tiền rút không hợp lệ.");
            return false;
        }

        if (amount > this.#balance) {
            console.error("Giao dịch thất bại: Số dư tài khoản không đủ.");
            return false;
        }

        this.#balance -= amount;
        console.log(`Rút thành công: -${amount}. Số dư hiện tại: ${this.#balance}`);
        return true;
    }

    getBalance() {
        return this.#balance;
    }
}

// Khởi tạo ví và nạp sẵn 1000đ để làm bia đỡ đạn
const myWallet = new SecureWallet();
myWallet.deposit(1000);

console.log("\n--- BẮT ĐẦU TẤN CÔNG HÀM WITHDRAW() ---");

// Kịch bản 1: Rút âm vô cùng để được cộng thêm tiền
console.log("\n[Kịch bản 1] Rút -Infinity:");
myWallet.withdraw(-Infinity);

// Kịch bản 2: Rút NaN để phá hoại số dư thành rác
console.log("\n[Kịch bản 2] Rút NaN:");
myWallet.withdraw(NaN);

// Kịch bản 3: Rút số siêu lẻ để làm lệch dấu phẩy động
console.log("\n[Kịch bản 3] Rút số thập phân lẻ (0.1):");
myWallet.withdraw(0.1);

// Kịch bản 4: Vượt rào bằng mảng số [500] nhằm ép kiểu ngầm
console.log("\n[Kịch bản 4] Rút mảng [500]:");
myWallet.withdraw([500]);

// Kịch bản 5: Rút số 0 âm (-0)
console.log("\n[Kịch bản 5] Rút số -0:");
myWallet.withdraw(-0);

console.log("\n--- KẾT QUẢ CUỐI CÙNG ---");
console.log("Số dư còn lại trong ví:", myWallet.getBalance());
