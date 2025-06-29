const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FixedAnnuity", function () {
  let contract;
  let owner, user, user2;

  beforeEach(async () => {
    [owner, user, user2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("FixedAnnuity");
    contract = await Contract.deploy();
  });

  it("should allow user to buy a policy", async () => {
    const term = 12;
    const deposit = ethers.parseEther("1");

    await contract.connect(user).buyPolicy(term, { value: deposit });
    const policy = await contract.policies(user.address);

    const payout = deposit / BigInt(term);

    expect(policy.deposit).to.equal(deposit);
    expect(policy.payoutPerMonth).to.equal(payout);
    expect(policy.termMonths).to.equal(term);
    expect(policy.monthsPaid).to.equal(0);
  });

  it("should revert if user claims too early", async () => {
    const term = 6;
    const deposit = ethers.parseEther("0.6");

    await contract.connect(user).buyPolicy(term, { value: deposit });

    await expect(
      contract.connect(user).claimMonthly()
    ).to.be.revertedWith("Too early");
  });

  it("should allow claim after 30 days", async () => {
    const term = 3;
    const deposit = ethers.parseEther("3");

    await contract.connect(user).buyPolicy(term, { value: deposit });

    await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine");

    const before = await ethers.provider.getBalance(user.address);
    const beforeBigInt = BigInt(before.toString());

    const tx = await contract.connect(user).claimMonthly();
    const receipt = await tx.wait();

    // Ensure gas data exists
    const gasUsed = receipt.gasUsed ? BigInt(receipt.gasUsed.toString()) : 0n;
    const gasPriceRaw = receipt.effectiveGasPrice ?? tx.gasPrice ?? 0n;
    const gasPrice = BigInt(gasPriceRaw.toString());
    const totalGasCost = gasUsed * gasPrice;

    const after = await ethers.provider.getBalance(user.address);
    const afterBigInt = BigInt(after.toString());

    expect(afterBigInt).to.be.greaterThan(beforeBigInt - totalGasCost);
  });


  it("should prevent over-claiming beyond term", async () => {
    const term = 2;
    const deposit = ethers.parseEther("2");

    await contract.connect(user).buyPolicy(term, { value: deposit });

    for (let i = 0; i < term; i++) {
      await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine");
      await contract.connect(user).claimMonthly();
    }

    await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine");

    await expect(
      contract.connect(user).claimMonthly()
    ).to.be.revertedWith("Finished");
  });

  it("should revert if deposit is zero", async () => {
    const term = 12;
    await expect(
      contract.connect(user).buyPolicy(term, { value: 0 })
    ).to.be.revertedWith("Deposit required");
  });

  it("should revert if term is zero", async () => {
    const deposit = ethers.parseEther("1");
    await expect(
      contract.connect(user).buyPolicy(0, { value: deposit })
    ).to.be.revertedWith("Invalid term");
  });

  it("should revert if user buys policy twice", async () => {
    const term = 12;
    const deposit = ethers.parseEther("1");
    await contract.connect(user).buyPolicy(term, { value: deposit });
    await expect(
      contract.connect(user).buyPolicy(term, { value: deposit })
    ).to.be.revertedWith("Policy already exists");
  });

  it("should revert if user claims without a policy", async () => {
    await expect(
      contract.connect(user).claimMonthly()
    ).to.be.revertedWith("No policy");
  });

  it("should allow multiple users to buy and claim independently", async () => {
    const term1 = 2, term2 = 3;
    const deposit1 = ethers.parseEther("2");
    const deposit2 = ethers.parseEther("3");

    await contract.connect(user).buyPolicy(term1, { value: deposit1 });
    await contract.connect(user2).buyPolicy(term2, { value: deposit2 });

    await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine");

    await contract.connect(user).claimMonthly();
    await contract.connect(user2).claimMonthly();

    const policy1 = await contract.policies(user.address);
    const policy2 = await contract.policies(user2.address);

    expect(policy1.monthsPaid).to.equal(1);
    expect(policy2.monthsPaid).to.equal(1);
  });

  it("should calculate payoutPerMonth as integer division", async () => {
    const term = 3;
    const deposit = ethers.parseEther("1");
    await contract.connect(user).buyPolicy(term, { value: deposit });
    const policy = await contract.policies(user.address);
    const expectedPayout = deposit / BigInt(term);
    expect(policy.payoutPerMonth).to.equal(expectedPayout);
  });
});
