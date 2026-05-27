import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";

function Editor() {
  return (
    <div>
      <h1>Editor del CV</h1>
      <PersonalForm />
      <hr />
      <SkillForm />
    </div>
  );
}

export default Editor;