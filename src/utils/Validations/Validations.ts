import { Nugget } from "@/interfaces/INugget";

export function validateSCC(values: Nugget){
    const errors: any = {};
    let flag = false;
    let check = false;
      if (!values.question.content || values.question.content.english == "") {
        errors.question = "Type Question is Empty";
      }

      values.question.bilingual_options?.english.map((opt) => {
        if (opt.text == "") {
          check = true;
        }
      });

      if (check) {
        errors.options = "Type Option is Empty";
      }
      values.question.bilingual_options?.english.map((opt) => {
        if (opt.isCorrect == true) {
          flag = true;
        }
      });

      if (!flag) {
        errors.isCorrect = "Correct Option not defined";
      }
    return errors;
}

export function validateFIB(values: Nugget){
    const errors: any = {};
    let blank = false;
    let text = false;

    values.question.fib.english.map((option,i)=>{
        if(option.type=="text")
            text=true;
        if(option.type=="blank")
            blank=true;
    })

    if(!blank){
        errors.isBlank = "FIB must have one blank";
    }

    if(!text){
        errors.isText = "FIB must have one text";
    }

    return errors;
}

export function validateAudio(values: Nugget){
  const errors: any = {};

  if(!values.audioUri){
    errors.isAudio = "AudioClip must have an Audio uploaded"
  }
}