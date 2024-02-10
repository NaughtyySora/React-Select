import { ChangeEvent, FC, useRef, useState } from "react";
import { Select } from "./components/Select/Select";
import { TextInput } from "./components/TextInput/TextInput";
import Coins from "./mocks/CryptoCoins.json";

export const App: FC = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const lowerValue = value.toLowerCase().trim();
  const coins = useRef(Object.values(Coins)[0]);

  const options = {
    select: coins.current.slice(0, 100),
    inputSelect: coins.current.slice(0, 100).filter(({ symbol, name }) =>
      symbol.toLowerCase().includes(lowerValue) || name.toLowerCase().includes(lowerValue))
  };

  const states = {
    simple: setTitle,
    input: setValue,
  };

  const onChange = (level: "simple" | "input", coin: typeof options.select[number]) => {
    const changeState = states[level];
    changeState(coin ? coin.name.toUpperCase() : "");
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <main className="App">
      <Select
        value={title}
        options={options.select}
        listItemKey="id"
        ListItem={({ name, symbol }) => <span>({symbol}) {name}</span>}
        onSelect={onChange.bind(null, "simple")}
      />

      <Select
        options={lowerValue ? options.inputSelect : options.select}
        listItemKey="id"
        ListItem={({ name, symbol }) => <span>({symbol}) {name}</span>}
        onSelect={onChange.bind(null, "input")}
        className="InputSelect"
      >
        <TextInput
          id="select|input"
          value={value}
          onChange={onInputChange}
          className="Select-input"
          placeholder="Enter Coin"
        />
      </Select>
    </main>
  );
};