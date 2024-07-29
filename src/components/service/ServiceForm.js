import styles from "../project/ProjectForm.module.css";
import { useState } from "react";
import Input from "../form/Input";
import Button from "../form/Button";

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({});
  
  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        id="name"
        placeholder="Informe o nome do serviço"
        handleOnchange={handleChange}
      />
      <Input
        type="number"
        text="Custo do Serviço"
        name="cost"
        id="cost"
        placeholder="Informe o valor total (R$)"
        handleOnchange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do Serviço"
        name="description"
        id="description"
        placeholder="Informe o descrição do serviço"
        handleOnchange={handleChange}
      />
      <Button text={btnText} />
    </form>
  );
}

export default ServiceForm;
