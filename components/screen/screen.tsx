import { useIntersection, useMergedRef } from "@mantine/hooks";
import { getDelayStyle } from "hooks/misc";
import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { scroll_store } from "../../store/animation";
import { command_store } from "../../store/commands";
import styles from "./styles.module.css";

export function Screen() {
  const [commands, setCommands] = useRecoilState(command_store);
  const shouldScroll = useRecoilValue(scroll_store);
  const containerRef = useRef(null);
  const bottomRef1 = useRef<HTMLSpanElement>(null);
  const { ref: bottomRef2, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  const bottomRef = useMergedRef(bottomRef2, bottomRef1);

  useEffect(() => {
    if (bottomRef1 && entry?.isIntersecting === false && shouldScroll) {
      bottomRef1.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [entry?.isIntersecting, commands, shouldScroll]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.screen_wrapper}>
      {commands.map((command) => (
        <React.Fragment key={command.id}>
          <p {...getDelayStyle(command.id)} className={styles.command_mirror}>
            {command.input}
          </p>
          {<command.output />}
          <p className={styles.line_break}></p>
        </React.Fragment>
      ))}
      <span ref={bottomRef}></span>
    </div>
  );
}
