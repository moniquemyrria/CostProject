import Message from "../layouts/Message";
import { useLocation } from "react-router-dom";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";
import styles from "./Projects.module.css";
import ProjectCards from "../project/ProjectCards";
import { useState, useEffect } from "react";
import Loading from "../layouts/Loading";
import Input from "../form/Input";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectsTemp, setProjectstemp] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");
  const [search, setSearch] = useState("");
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setProjectstemp(data);
          setRemoveLoading(true);
        })
        .catch((error) => console.log(error));
    }, 1000);
  }, []);

  useEffect(() => {
    handleFindProject();
  }, [search !== ""]);

  function removeProject(id) {
    fetch(`http://localhost:8000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((error) => console.log(error));
  }

  function handleFindProject() {
    setProjects([]);
    setRemoveLoading(false);
    setTimeout(() => {
      if (search !== "") {
        setProjects(
          projectsTemp.filter((project) =>
            project.name.toLowerCase().includes(search.toLowerCase())
          )
        );
        setRemoveLoading(true);
      } else {
        setProjects(projectsTemp);
        setRemoveLoading(true);
      }
    }, 500);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newProject" text="Criar Projeto" />
      </div>

      <div className={styles.project_search}>
        <Input
          type="text"
          text="Busca de projetos"
          name="search"
          id="search"
          placeholder="Pesquisa pelo nome"
          handleOnchange={handleSearch}
          value={search}
        />
      </div>

      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="success" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCards
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
