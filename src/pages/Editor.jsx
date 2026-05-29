import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";
import ProjectForm from "../components/ProjectForm";
import EducationForm from "../components/EducationForm";
import ExtraInfoForm from "../components/ExtraInfoForm";

function Editor() {
  return (
    <div>
      <h1>Editor del CV</h1>
      <PersonalForm />
      <hr />
      <SkillForm />
      <hr />
      <ProjectForm />
      <hr />
      <EducationForm />
      <hr />
      <ExtraInfoForm />
    </div>
  );
}

export default Editor;