const main = async () => {
  
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    // We pass in "anime" to the constructor when deploying
    const domainContract = await domainContractFactory.deploy("anime");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // We're passing in a second variable - value. This is the moneyyy
    let txn = await domainContract.register("fantasy",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
  
    const address = await domainContract.getAddress("fantasy");
    console.log("Owner of domain fantasy:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  // Trying to set a record that doesn't belong to me!
  // txn = await domainContract.connect(randomPerson).setRecord("doom", "Haha my domain now!");
  // await txn.wait();
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();