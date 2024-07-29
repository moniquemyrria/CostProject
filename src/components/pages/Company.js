import styles from "./Company.module.css";
function Company() {
  return (
    <div className={styles.company_container}>
      <h1>Sobre o Sistema</h1>
      <p>
        O Cost de Projetos é uma sistema especializado na gestão e controle de
        custos em projetos de diversos setores. Com foco em oferecer soluções
        eficientes e personalizadas, a empresa atua nas seguintes áreas:
      </p>
      <br />
      <p>
        1. Consultoria em Gestão de Custos: Análise detalhada dos custos
        envolvidos em cada fase do projeto, com o objetivo de identificar
        possíveis economias e otimizar o orçamento.
      </p>
      <br />
      <p>
        2. Gestão de Serviços: Análise detalhada dos custos envolvidos em
        serviço.
      </p>

      <br />
      <p>*Projeto para aprendizado. Desenvolvido com o framework React*</p>
    </div>
  );
}

export default Company;
