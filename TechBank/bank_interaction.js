class BankAccount {
    #balance = 0;

    constructor(ownerName, initialBalance = 0) {
        this.ownerName = ownerName;
        if (typeof initialBalance === 'number' && initialBalance > 0) {
            this.#balance = initialBalance;
        }
    }

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

    transferTo(targetAccount, amount) {
        console.log(`Yêu cầu chuyển tiền từ ${this.ownerName} đến ${targetAccount.ownerName} số tiền: ${amount}`);

        if (!(targetAccount instanceof BankAccount)) {
            console.error("Giao dịch thất bại: Tài khoản đích không hợp lệ.");
            return false;
        }

        const withdrawSuccess = this.withdraw(amount);

        if (withdrawSuccess) {
            const depositSuccess = targetAccount.deposit(amount);

            if (depositSuccess) {
                console.log(`Chuyển tiền thành công từ ${this.ownerName} đến ${targetAccount.ownerName} số tiền: ${amount}`);
                return true;
            } else {
                this.#balance += amount;
                console.error(`=> Lỗi hệ thống: Đã hoàn lại tiền cho ${this.ownerName}.`);
                return false;
            }
        }

        console.log(`Chuyển tiền thất bại từ ${this.ownerName} đến ${targetAccount.ownerName}`);
        return false;

    }

}

// --- KHỞI TẠO 3 ĐỐI TƯỢNG VÀ THỰC HIỆN GIAO DỊCH CHÉO ---

const alice = new BankAccount("Alice", 1000);
const bob = new BankAccount("Bob", 500);
const charlie = new BankAccount("Charlie", 200);

// 1. Alice chuyển cho Bob 300 (Thành công)
alice.transferTo(bob, 300);

// 2. Bob chuyển cho Charlie 400 (Thành công - vì Bob vừa được nhận thêm 300, tổng là 800)
bob.transferTo(charlie, 400);

// 3. Charlie chuyển cho Alice 700 (Thất bại - vì Charlie chỉ có 600)
charlie.transferTo(alice, 700);

// 4. Kiểm tra thử trường hợp nhập số tiền không hợp lệ
alice.transferTo(bob, -50);