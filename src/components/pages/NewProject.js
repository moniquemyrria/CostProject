import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  function createdPost(project) {
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:8000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Crar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createdPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
