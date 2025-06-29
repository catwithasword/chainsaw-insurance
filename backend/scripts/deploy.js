async function main() {
  // Get the contract factory
  const FixedAnnuity = await ethers.getContractFactory("FixedAnnuity");

  // Deploy contract
    const fixedAnnuity = await FixedAnnuity.deploy();
    console.log("FixedAnnuity deployed to:", fixedAnnuity.target); // ethers v6
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
