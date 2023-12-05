import { useEffect, useState } from "react";
import mintTokenAbi from "../mintTokenAbi.json";
import contractAddress from "../contractAddress.json";
import OptionCard from "./OptionCard";

const TokenCard = ({ account, web3, address, owner, walletAccount }) => {
  const [name, setName] = useState("Token");
  const [symbol, setSymbol] = useState("Token");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState();
  const [inputAccount, setInputAccount] = useState("");
  const [inputValue, setInputValue] = useState("0");

  const getName = async () => {
    try {
      const response = await contract.methods.name().call();
      setName(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getsymbol = async () => {
    try {
      const response = await contract.methods.symbol().call();
      setSymbol(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getbalanceOf = async () => {
    try {
      const response = await contract.methods.balanceOf(account).call();
      setBalance(web3.utils.fromWei(response, "ether"));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(walletAccount);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitSend = async (e) => {
    try {
      e.preventDefault();
      //   새로고침이 일어나니까 막아줌

      const response = await contract.methods
        .transfer(inputAccount, web3.utils.toWei(inputValue, "ether"))
        .send({
          from: account,
        });

      getbalanceOf();
      //   보낸만큼 차감되서 보이게하는것

      setInputValue("0");
      alert("성공!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!web3) return;

    setContract(new web3.eth.Contract(mintTokenAbi, address));
  }, [web3]);

  useEffect(() => {
    if (!contract || !account) return;
    getName();
    getsymbol();
    getbalanceOf();
  }, [contract, account]);

  useEffect(() => console.log(inputAccount), [inputAccount]);

  return (
    <div>
      <div className="flex justify-center items-center ">
        <div>
          <button
            className="hover:bg-blue-500 flex flex-col justify-center"
            onClick={onClickClipBoard}
          >
            {owner}
          </button>
        </div>
        <div className="bg-blue-200 w-96 flex gap-3 justify-center">
          <div> {name}</div>
          <div> {symbol}</div>
          <div> {balance}</div>
          <div>
            {" "}
            {walletAccount.substring(0, 5)}...
            {walletAccount.substring(walletAccount.length - 5)}
          </div>
        </div>
        <div>
          <form className="flex bg-slate-600" onSubmit={onSubmitSend}>
            <select
              value={inputAccount}
              onChange={(e) => setInputAccount(e.target.value)}
            >
              <option value=""></option>
              {contractAddress.map((v, i) => (
                <OptionCard
                  key={i}
                  owner={v.owner}
                  walletAccount={v.walletAccount}
                />
              ))}
            </select>
            <input
              className="bg-cyan-100"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
