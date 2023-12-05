import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import TokenCard from "./components/TokenCard";
import contractAddress from "./contractAddress.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState();

  const { sdk, provider } = useSDK();
  const onClickMetaMask = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center">
      <img src="./img/whale.jpg" className="absolute z-10 " />
      {account ? (
        <div className="z-30 text-sm mx-5 border flex flex-col justify-center items-center">
          <img src="./img/sepolia.png" className=" w-500px h-96 mb-40" />
          <div>
            {account.substring(0, 5)}...{account.substring(account.length - 5)}
            <button className="absolute" onClick={() => setAccount("")}>
              LogOut
            </button>
          </div>
          <div className="">
            
            {contractAddress.map((v, i) => (
              <TokenCard
                key={i}
                account={account}
                web3={web3}
                address={v.address}
                owner={v.owner}
                walletAccount={v.walletAccount}
              />
            ))}
          </div>
        </div>
      ) : (
        <button
          className="z-20 bg-blue-500 rounded-3xl px-5 border shadow-2xl"
          onClick={onClickMetaMask}
        >
          Metamask Login
        </button>
      )}
    </div>
  );
};

export default App;
