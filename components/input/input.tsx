import { useFocus } from "../../util/useFocus";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import response_styles from "../screen/styles.module.css";
import { useRecoilState } from "recoil";
import { command_store } from "../../store/commands";
import { Engine } from "../../util/engine";
import { scroll_store } from "../../store/animation";

const sandbox = new Engine();

export function Input() {
  const ref = useFocus();
  const [shouldScroll] = useRecoilState(scroll_store);
  const [value, setValue] = useState("");
  const [commands, setCommands] = useRecoilState(command_store);

  useEffect(() => {
    ref.current?.focus();
  }, [shouldScroll, ref]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let _value = value.trim();

    if (value.length > 0) {
      const result = await sandbox.run(_value);
      setCommands((commands) => [...commands, result]);

      // const isOnlyEmoji =
      //   /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.test(
      //     _value
      //   ) && _value.length === 2;

      // if (isOnlyEmoji) {
      //   setCommands((commands) => [
      //     ...commands,
      //     {
      //       input: "[beep boop! some emoji...]",
      //       output: () => (
      //         <p className={response_styles.emoji_response}>
      //           <span>{_value}</span>
      //         </p>
      //       ),
      //       id: `id-${Math.random()}`,
      //     },
      //   ]);
      // } else {
      //   setCommands((commands) => [
      //     ...commands,
      //     {
      //       input: _value,
      //       output: () => (
      //         <p className={response_styles.command_response}>
      //           <span>{_value}</span>
      //         </p>
      //       ),
      //       id: `id-${Math.random()}`,
      //     },
      //   ]);
      // }

      setValue("");
    }
  };

  return (
    <div className={styles.input_wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
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
