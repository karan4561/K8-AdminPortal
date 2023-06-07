import { CategoryObject } from "@/interfaces/INugget";
import { useContext, useEffect, useState } from "react";
import * as _ from "lodash";
import { NuggetsContext } from "./NuggetsContext";

function useFilters() {
  //validateFilter
  const [filters, setFilters] = useState<CategoryObject[]>([{}]);
  const { setNugget } = useContext(NuggetsContext);

  useEffect(() => {
    setFilters(filters);
    console.log("Here is the category object", filters);
    //updateFilters(filters);
  }, [filters]);

  // function updateFilters(filter: CategoryObject[]) {
  // }

  function selectCategory(idx: number, categoryId: string) {
    const filtersCopy = _.cloneDeep(filters);
    filtersCopy[idx] = { ...filtersCopy[idx], categoryId: categoryId };
    setFilters(filtersCopy);
  }

  function selectSubject(idx: number, subjectId: string) {
    const filtersCopy = _.cloneDeep(filters);
    filtersCopy[idx] = { ...filtersCopy[idx], subjectId: subjectId };
    setFilters(filtersCopy);
  }

  function selectChapter(idx: number, chapterId: string) {
    const filtersCopy = _.cloneDeep(filters);
    filtersCopy[idx] = { ...filtersCopy[idx], chapterId: chapterId };
    setFilters(filtersCopy);
  }
  function selectTopic(idx: number, topicId: string) {
    const filtersCopy = _.cloneDeep(filters);
    filtersCopy[idx] = { ...filtersCopy[idx], topicId: topicId };
    setFilters(filtersCopy);
  }

  function deleteFilter(idx: number) {
    const filtersCopy = _.cloneDeep(filters);
    filtersCopy.splice(idx, 1);
    setFilters(filtersCopy);
  }
  function addFilter() {
    setFilters([...filters, {}]);
  }
  return {
    filters,
    setFilters,
    selectCategory,
    selectChapter,
    selectTopic,
    deleteFilter,
    addFilter,
    selectSubject,
  };
}

export default useFilters;

// display post message
