import styles from "./EditProject.module.css";
import { useParams } from "react-router-dom";
import { parse, v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layouts/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function ProjectCards() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:8000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
          setRemoveLoading(true);
        })
        .catch((error) => console.log(error));
    }, 1000);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function editPost(project) {
    setMessage("");
    if (project.budget < project.cost) {
      setMessage("O Orçamento não pode ser menor que o custo do projeto.");
      setType("error");
      return;
    }

    fetch(`http://localhost:8000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Dados do Projeto atualizado.");
        setType("success");
      })
      .catch((error) => console.log(error));
  }

  function createService(project) {
    setMessage("")
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage(
        "Valor do Orçamento ultrapassado, verifique o valor do serviço."
      );
      setType("error");
      project.services.pop();
      return;
    }

    project.cost = newCost;

    fetch(`http://localhost:8000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services);
        setShowServiceForm(!showServiceForm);
        setMessage("Serviço adicionado com sucesso!");
        setType("success");
      })
      .catch((error) => console.log(error));
  }

  function removeService(id, cost) {
    setMessage("")
    const servicesUpdate = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;
    projectUpdated.services = servicesUpdate;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:8000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdate)
        setMessage("Serviço removido com sucesso!")
        setType("success")
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="colunm">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Voltar para Detalhes"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: R$ </span>
                    {project.budget.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    <span>Total utilizado: R$</span> {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Salvar dados"
                    projectData={project}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>

            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviçoes cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ProjectCards;
