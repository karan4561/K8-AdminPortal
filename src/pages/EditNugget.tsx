import Image from "next/image";
import { useState, useEffect } from "react";
import Select from "react-select";
import data from "test.json";
import { getCategory, getSubject, getChapters, getTopics } from "@/api/filter";
import { Nugget } from "@/interfaces/INugget";
import { getNuggetList } from "@/api/utils";

interface Approve {
  value: string;
  label: string;
}

interface OptionType {
  value: string;
  label: string;
}

function EditNugget() {
  const approveStatus: Approve[] = [
    { value: "", label: "check" },
    { value: "true", label: "Approved" },
    { value: "false", label: "Not Approved" },
  ];

  const [nuggetList, setNuggetList] = useState<Nugget[]>();

  const [categoryList, setCategoryList] = useState<OptionType[]>();
  const [subjectList, setSubjectList] = useState<OptionType[]>();
  const [topicList, setTopicList] = useState<OptionType[]>();
  const [chapterList, setChapterList] = useState<OptionType[]>();

  const [approvedStatus, setApprovedStatus] = useState<Approve[]>();
  const [category, setCategory] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");

  useEffect(() => {
    getCategory().then((data) =>
      setCategoryList(
        data.map((obj: any) => {
          return { value: obj.unique_id, label: obj.name };
        })
      )
    );
  }, []);

  const onCategoryChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setCategory(selectedOption.value);
      getSubject(selectedOption.value).then((data) =>
        setSubjectList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
  };

  const onSubjectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setSubject(selectedOption.value);
      getChapters(category, selectedOption.value).then((data) =>
        setChapterList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
  };

  const onChapterChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setChapter(selectedOption.value);
      getTopics(category, subject, selectedOption.value).then((data) =>
        setTopicList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
    // setChapterValue(selectedOption);
  };

  const approveStatusChange = (selectedOption: Approve | null) => {
    if (selectedOption) {
      setApprovedStatus(selectedOption.value);
    }
  };

  const onTopicChange = (selectedOption: OptionType | null) => {
    if (selectedOption) setTopic(selectedOption.value);
  };

  const onSubmit = () => {
    if (category && subject && chapter) {
      console.log(
        chapter,
        "chapter",
        topic,
        "topic",
        category,
        "category",
        subject,
        "subject",
        approvedStatus,
        "approveStatus"
      );
      getNuggetList(
        10,
        false,
        category,
        subject,
        chapter,
        topic,
        approveStatus[0].value
      ).then((data) => setNuggetList(data));
      console.log("********Nugget-List**********", nuggetList);
    } else alert("Add Required Fields");
  };

  return (
    <>
      <h3>Search Nugget by:</h3>
      <div className="edit-nugget-category">
        <Select
          className="AddNuggetCategory"
          // value={categoryList?.filter((o) => o.value == category.categoryId)}
          onChange={onCategoryChange}
          options={categoryList}
          placeholder="Category"
        />
        <Select
          className="AddNuggetCategory"
          // value={}
          onChange={onSubjectChange}
          options={subjectList}
          placeholder="Subject"
        />
        <Select
          className="AddNuggetCategory"
          // value={}
          onChange={onChapterChange}
          options={chapterList}
          placeholder="Chapter"
        />
        <Select
          className="AddNuggetCategory"
          // value={}
          onChange={onTopicChange}
          options={topicList}
          placeholder="Topic"
          isClearable={true}
        />
        <Select
          className="AddNuggetCategory"
          // value={approvedStatus}
          onChange={approveStatusChange}
          options={approveStatus}
          placeholder="Status"
        />
        <button onClick={onSubmit}>Search</button>
      </div>
      {nuggetList?.map((nugget, index) => {
        if (nugget.kind == "MCQ" || nugget.kind == "SCQ") {
          return (
            <div className="edit-label">
              <div className="edit-Nugget-div-label">
                <p>#{nugget._id}</p>
                <div>
                  <button className="edit-delete-button">
                    <Image src="/Edit.png" height={15} width={15} alt="" />
                  </button>
                  <button className="edit-delete-button">
                    <Image src="/Vector.png" height={15} width={15} alt="" />
                  </button>
                </div>
              </div>
              <div className="edit-nugget-prev">
                <div className="headerimage-headertitle">
                  <h4>{nugget.headerTitle}</h4>
                </div>
                <p>{nugget.question.content?.english}</p>
                <div className="TFPrev">
                  {nugget.question.bilingual_options?.english.map(
                    (optionData, index) => {
                      return (
                        <div className="TFOptionPrev scq-option-prev">
                          <p>
                            {index + 1}. {optionData.text}
                          </p>
                          <div></div>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="prev-buttons">
                  <p>Hint</p>
                  <p className="Submit-prev">Submit</p>
                  <p className="Submit-prev prev-color">Don't know</p>
                </div>
                <div className="Hint-Prev-box">
                  <h4>Solution</h4>
                  <p>{nugget.question.solutions[0].english.text}</p>
                </div>
                <div className="Hint-Prev-box">
                  <h4>Hint</h4>
                  <p>{nugget.question.solutions[0].english.hint}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default EditNugget;
