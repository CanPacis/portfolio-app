import { useFocus } from "../../util/useFocus";
import { useState } from "react";
import styles from "./styles.module.css";
import response_styles from "../screen/styles.module.css";
import { useRecoilState } from "recoil";
import { command_store } from "../../store/commands";
import { Engine } from "../../util/engine";

const sandbox = new Engine();

export function Input() {
  const ref = useFocus();
  const [value, setValue] = useState("");
  const [commands, setCommands] = useRecoilState(command_store);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let _value = value.trim();

    if (value.length > 0) {
      sandbox.run(_value);

      const isOnlyEmoji =
        /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.test(
          _value
        ) && _value.length === 2;

      if (isOnlyEmoji) {
        setCommands((commands) => [
          ...commands,
          {
            input: "[beep boop! some emoji...]",
            output: () => (
              <p className={response_styles.emoji_response}>
                <span>{_value}</span>
              </p>
            ),
            id: `id-${Math.random()}`,
          },
        ]);
      } else {
        setCommands((commands) => [
          ...commands,
          {
            input: _value,
            output: () => (
              <p className={response_styles.command_response}>
                <span>{_value}</span>
              </p>
            ),
            id: `id-${Math.random()}`,
          },
        ]);
      }

      setValue("");
    }
  };

  return (
    <div className={styles.input_wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck="false"
          autoComplete="off"
          ref={ref}
          id="input"
          type="text"
        />
      </form>
    </div>
  );
}
