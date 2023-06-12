import { useState, useContext, useEffect } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import { getCategory, getSubject, getChapters, getTopics } from "@/api/filter";
import Select from "react-select";

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
  const [nuggetId, setNuggetId] = useState();
  const category = nugget.categories[props.index];
  console.log("******Nugget from Filter*****", category);

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

  useEffect(() => {
    if (props.nuggetId && !chapterList && category.subjectId) {
      onSubjectChange({value:category.subjectId})
    }
    console.log(nugget.categories[props.index].subjectId,"props.nuggetId");
  }, [props.nuggetId,chapterList,category.subjectId])

  const onSubjectChange = (selectedOption: OptionType | null) => {

    if (selectedOption && category.categoryId) {
      selectSubject(props.index, selectedOption.value);
      await getChapters(category.categoryId, selectedOption.value).then(
        (data) =>
          setChapterList(
            data.map((obj: any) => {
              return { value: obj.unique_id, label: obj.english_name };
            })
          )
      );
    }
  };

  useEffect(()=>{
      if(category.categoryId && props.nuggetId && !subjectList){
        onCategoryChange({value:category.categoryId})
      }
    console.log(category.categoryId,"123456789");
  },[props.nuggetId,subjectList,category.categoryId])
  
  const onCategoryChange = (selectedOption: OptionType | null) => {

    if (selectedOption) {
      selectCategory(props.index, selectedOption.value);
      await getSubject(selectedOption.value).then((data) =>
        setSubjectList(
          data.map((obj: any) => {
            return { value: obj.unique_id, label: obj.english_name };
          })
        )
      );
    }
  };

  useEffect(()=>{
    if(props.nuggetId && !chapterList && category.chapterId){
      onChapterChange({value:category.chapterId})
    }
  },[props.nuggetId,chapterList,category.chapterId])

  const onChapterChange = async (selectedOption: OptionType | null) => {
    if (selectedOption && category.categoryId && category.subjectId) {
      selectChapter(props.index, selectedOption.value);
      await getTopics(
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
  };

  return (
    // <div>
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
    // </div>
  );
}

export default NuggetFilters;

