import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";
import ProjectForm from "../components/ProjectForm";

function Editor() {
  return (
    <div>
      <h1>Editor del CV</h1>
      <PersonalForm />
      <hr />
      <SkillForm />
      <hr />
      <ProjectForm />
    </div>
  );
}

export default Editor;