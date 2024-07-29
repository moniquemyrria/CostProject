import styles from "./Company.module.css";
import {
  Bs1Circle,
  BsAirplaneEngines,
  BsBank2,
  BsFlower1,
  BsMailbox,
  BsMailbox2Flag,
  BsPerson,
  BsPersonDashFill,
  BsPersonFill,
} from "react-icons/bs";

function Contact() {
  return (
    <div className={styles.company_container}>
      <h1>Contatos da Desenvolvedora</h1>
      <p>
        <span>
          E-mail:{" "}
          <a
            href="mailto:moniquermyrria@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            moniquermyrria@gmail.com
          </a>
        </span>
      </p>
      <p>
        <span>
          Github:{" "}
          <a
            href="https://github.com/moniquemyrria"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/moniquemyrria
          </a>
        </span>
      </p>
      <p>
        <span>
          Linkedin:{"  "}
          <a
            href="https://www.linkedin.com/in/moniquerocha/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.linkedin.com/in/moniquerocha/
          </a>
        </span>
      </p>

      <br />

      <p>*Projeto para aprendizado. Desenvolvido com o framework React*</p>
    </div>
  );
}

export default Contact;
