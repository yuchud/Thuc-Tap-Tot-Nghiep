class Money {
  constructor(amount) {
    this.amount = amount;
  }

  subtract(other) {
    return new Money(this.amount - other.amount);
  }

  toString() {
    return this.amount.toFixed(2);
  }
}

module.exports = Money;
