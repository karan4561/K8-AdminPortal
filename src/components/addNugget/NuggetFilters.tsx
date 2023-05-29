import { useState, useContext, useEffect } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import { getCategory, getSubject, getChapters, getTopics } from "@/api/filter";
import { CategoryObject } from "@/interfaces/INugget";
import Select from "react-select";
import { filter } from "lodash";

interface OptionType {
  value: string;
  label: string;
}

function NuggetFilters(props: any) {
  const {
    nugget,
    deleteFilter,
    selectCategory,
    selectSubject,
    selectTopic,
    selectChapter,
  } = useContext(NuggetsContext);

  const category = nugget.categories[props.index];

  const [categoryList, setCategoryList] = useState<OptionType[]>();
  const [subjectList, setSubjectList] = useState<OptionType[]>();
  const [topicList, setTopicList] = useState<OptionType[]>();
  const [chapterList, setChapterList] = useState<OptionType[]>();

  useEffect(() => {
    getCategory().then((data) =>
      setCategoryList(
        data.map((obj: any) => {
          return { value: obj.unique_id, label: obj.name };
        })
      )
    );
  }, []);

  const TopicChange = (selectedOption: OptionType | null) => {
    if (selectedOption) selectTopic(props.index, selectedOption.value);
  };

  const onSubjectChange = (selectedOption: OptionType | null) => {
    if (selectedOption && category.categoryId) {
      selectSubject(props.index, selectedOption.value);
      getChapters(category.categoryId, selectedOption.value).then((data) =>
        setChapterList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
  };

  const onCategoryChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      selectCategory(props.index, selectedOption.value);
      getSubject(selectedOption.value).then((data) =>
        setSubjectList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
  };

  const onChapterChange = (selectedOption: OptionType | null) => {
    if (selectedOption && category.categoryId && category.subjectId) {
      selectChapter(props.index, selectedOption.value);
      getTopics(
        category.categoryId,
        category.subjectId,
        selectedOption.value
      ).then((data) =>
        setTopicList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
    // setChapterValue(selectedOption);
  };

  return (
    <div>
      <div className="select-dropdown">
        {/* <Category/> */}
        <Select
          className="AddNuggetCategory"
          value={categoryList?.filter((o) => o.value == category.categoryId)}
          onChange={onCategoryChange}
          options={categoryList}
          placeholder="Category"
        />
        {/* <Subject /> */}
        <Select
          className="AddNuggetCategory"
          value={subjectList?.filter((o) => o.value == category.subjectId)}
          onChange={onSubjectChange}
          options={subjectList}
          placeholder="Subject"
        />
        {/* <Chapter /> */}
        <Select
          className="AddNuggetCategory"
          value={chapterList?.filter((o) => o.value == category.chapterId)}
          onChange={onChapterChange}
          options={chapterList}
          placeholder="Chapter"
        />
        {/* <Topic /> */}
        <Select
          className="AddNuggetCategory"
          value={topicList?.filter((o) => o.value == category.topicId)}
          onChange={TopicChange}
          options={topicList}
          placeholder="Topic"
        />
        {props.index ? (
          <button onClick={() => deleteFilter(props.index)}>Delete</button>
        ) : null}
      </div>
    </div>
  );
}

export default NuggetFilters;
