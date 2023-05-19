import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { NuggetsContext } from "../../context/NuggetsContext";
import { getCategory, getSubject } from "@/api/filter";
interface OptionType {
  value: string;
  label: string;
}
export default function AddNuggetHeader() {
  const { updateCategoryObject } = useContext(NuggetsContext);

  const Subject: OptionType[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const Category: OptionType[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const Topic: OptionType[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const Chapter: OptionType[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [categoryList, setCategoryList] = useState<OptionType[]>();
  const [subjectList, setSubjectList] = useState<OptionType[]>();

  useEffect(() => {
    getCategory().then((data) =>
      setCategoryList(
        data.map((obj: any) => {
          return { value: obj.unique_id, label: obj.name };
        })
      )
    );
  }, []);

  const [categoryValue, setcategoryValue] = useState<OptionType>(Category[0]);
  const [ChapterValue, setChapterValue] = useState<OptionType>(Chapter[0]);
  const [SubjectValue, setSubjectValue] = useState<OptionType>(Subject[0]);
  const [TopicValue, setTopicValue] = useState<OptionType | null>(null);

  const TopicChange = (selectedOption: OptionType | null) => {
    setTopicValue(selectedOption);
    updateCategoryObject({
      Topic: selectedOption?.value
    })
  };

  const SubjectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setSubjectValue(selectedOption);
      updateCategoryObject({
        Subject: selectedOption.value
      })
    }
  };

  const CategoryChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setcategoryValue(selectedOption);
      updateCategoryObject({
        Category: selectedOption.value
      })
      getSubject(selectedOption.value).then((data) =>
        setSubjectList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
  };

  const ChapterChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setChapterValue(selectedOption);
      updateCategoryObject({
        Chapter: selectedOption.value
      })
    }
    // setChapterValue(selectedOption);
  };
  return (
    <>
      <div className="card-header AddNugget">
        <h2>Add Nugget To</h2>
        <div className="select-dropdown">
          {/* <Category/> */}
          <Select
            className="AddNuggetCategory"
            value={categoryValue}
            onChange={CategoryChange}
            options={categoryList}
            placeholder="Category"
          />
          {/* <Subject /> */}
          <Select
            className="AddNuggetCategory"
            value={SubjectValue}
            onChange={SubjectChange}
            options={subjectList}
            placeholder="Subject"
          />
          {/* <Chapter /> */}
          <Select
            className="AddNuggetCategory"
            value={ChapterValue}
            onChange={ChapterChange}
            options={Chapter}
            placeholder="Chapter"
          />
          {/* <Topic /> */}
          <Select
            className="AddNuggetCategory"
            value={TopicValue || null}
            onChange={TopicChange}
            options={Topic}
            placeholder="Topic"
          />
        </div>
      </div>
    </>
  );
}
