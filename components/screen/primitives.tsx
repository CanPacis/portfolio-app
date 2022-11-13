import { getDelayStyle } from "hooks/misc";
import { useRecoilState } from "recoil";
import { scroll_store } from "../../store/animation";
import styles from "./styles.module.css";

export function Title() {
  return (
    <h1 {...getDelayStyle(0)} className={styles.command_response}>
      Hello, This is Muhammed Ali
    </h1>
  );
}

export function Subtitle() {
  return (
    <h2 {...getDelayStyle(1)} className={styles.command_response}>
      Senior Frontend Developer
    </h2>
  );
}

export function Description() {
  return (
    <p {...getDelayStyle(2)} className={styles.command_response}>
      <span>
        I am a <b>self-taught</b> programmer with immense curiosity, not only a
        learner but also <b>a lover of learning</b>. I taught myself playing the
        guitar and the piano, I learned English almost all on my own and{" "}
        <b>I taught myself programming</b>. I still seek knowledge and try to
        learn new stuff in every front.
      </span>
    </p>
  );
}

export function Experience() {
  return (
    <div {...getDelayStyle(3)} className={styles.command_response}>
      <ul>
        <li>
          <b>Freelancer @ various</b>{" "}
          <span className={styles.command_hint}>2020-2021</span>{" "}
          <ul>
            <li>Developed landing pages with contemporary web technologies.</li>
            <li>Worked to meet client deadlines.</li>
            <li>
              Designed and re-visioned the products according to client&apos;s
              needs.
            </li>
            <li>Handled domain and server registration.</li>
            <li>Deployed and since maintained the product.</li>
          </ul>
        </li>
        <li>
          <b>Frontend Developer @ via-vis</b>{" "}
          <span className={styles.command_hint}>2021-2022</span>
          <ul>
            <li>
              Developed strategies to ensure compliance with new standards.
            </li>
            <li>
              Handled debugging and troubleshooting with a high success rate.
            </li>
            <li>
              Effectively multi-tasked and worked well with internal and
              external teams.
            </li>
            <li>
              Helped to achieve a consistent look and visual theme across the
              website by promotinguniform fonts, formatting, images, and layout.
            </li>
            <li>
              Worked with a proficient understanding of code conversion tools.
            </li>
          </ul>
        </li>
        <li>
          <b>Senior Frontend Developer @ Macellan</b>{" "}
          <span className={styles.command_hint}>2022-Current</span>
          <ul>
            <li>
              Created and oversaw the progress of multiple web interfaces.
            </li>
            <li>Supervised multiple projects at once and team members.</li>
            <li>Worked with other teammates from other disciplines.</li>
            <li>Managed large, complex web applications.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export function Contact() {
  const [, setShouldScroll] = useRecoilState(scroll_store);

  return (
    <div
      {...getDelayStyle(4)}
      onAnimationStart={() => setShouldScroll(true)}
      className={styles.command_response}
    >
      <ul>
        <li>
          LinkedIn{" "}
          <a href="https://www.linkedin.com/in/can-pacis/">@can-pacis</a>
        </li>
        <li>
          Github <a href="https://github.com/CanPacis/">@CanPacis</a>
        </li>
        <li>
          Email <a href="#">contact@canpacis.net</a>
        </li>
        <li>
          StackOverflow{" "}
          <a href="https://stackoverflow.com/users/12360941/can-pacis/">
            @canpacis
          </a>
        </li>
      </ul>
    </div>
  );
}
