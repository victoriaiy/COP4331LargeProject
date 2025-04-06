import AddVocabListForm from "./AddVocabListForm";
import Header from "../Header";

const AddVocabListPage = () => {
  const userId = localStorage.getItem("userId")?.replace(/"/g, "");

  return (
    <div className="min-h-screen min-w-screen relative p-3 bg-gray-400">
      <Header/>
      <AddVocabListForm userId={userId} />
    </div>
  );
};

export default AddVocabListPage;
