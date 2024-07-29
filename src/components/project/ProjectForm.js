import Input from "../form/Input";
import Select from "../form/Select";
import Button from "../form/Button";
import styles from "./ProjectForm.module.css";
import { useEffect, useState } from "react";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, SetCategories] = useState([]);

  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:8000/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => SetCategories(data))
      .catch((error) => console.log(error));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome"
        name="name"
        id="name"
        placeholder="Informe o nome do projeto"
        handleOnchange={handleChange}
        value={project.name}
      />

      <Input
        type="number"
        text="Orçamento (R$)"
        name="budget"
        id=" budget"
        placeholder="Informe o valor do orçamento (R$)"
        handleOnchange={handleChange}
        value={project.budget}
      />
      <Select
        name="categoryId"
        text="Categoria"
        options={categories}
        handleOnchange={handleCategory}
        value={project.category ? project.category.id :'' }
      />

      <Button text={btnText} />
    </form>
  );
}

export default ProjectForm;
