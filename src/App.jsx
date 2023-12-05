import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import mintTokenAbi from "./mintTokenAbi.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();

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

  useEffect(() => {
    if (!web3) return;

    setContract(
      new web3.eth.Contract(
        mintTokenAbi,
        "0x46242FE77bb02CEcE8AFAaef8E119A14CC90DF83"
      )
    );
  }, [web3]);
  useEffect(() => console.log(contract), [contract]);

  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      {account ? (
        <div>
          {account.substring(0, 5)}...{account.substring(account.length - 5)}
          <button onClick={() => setAccount("")}>LogOut</button>
        </div>
      ) : (
        <button onClick={onClickMetaMask}>Metamask Login</button>
      )}
    </div>
  );
};

export default App;
