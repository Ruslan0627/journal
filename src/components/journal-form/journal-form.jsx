import styles from "./journal-form.module.css";
import Button from "../button/button";
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { FORM_INITIAL_STATE, formReducer } from "./journal-form.state";

function JournalForm({ onSubmit }) {
  const [state, dispatch] = useReducer(formReducer,FORM_INITIAL_STATE)
  const {isValid, isFormReadyToSubmit, values} = state

  useEffect(() => {
    let timerId 
    timerId = setTimeout(()=> {
      dispatch({type:"RESET_VALID"})
    },2000) 
    return () => {
      clearTimeout(timerId)
    }
  } ,[isValid])
  
  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(state.values)
      dispatch({type:"RESET_VALUES"})
    }
  },[isFormReadyToSubmit])

  function handleChange (e)  {
    const {name,value} = e.target;
    dispatch({type:"SET_VALUE", payload:{[name]:value}})
  };

  function onSubmitForm (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData)
    dispatch({type:"SUBMIT", payload:formValues})
  };

  return (
    <form onSubmit={onSubmitForm} className={styles.journalForm}>
      <input
      placeholder="Введите заголовк"
        className={cn(styles.title,styles.input,{
          [styles.invalid]: !isValid.title 
        })}
        name="title"
        type="text"
        value={values.title}
        onChange={ handleChange}
      />
      <label className={cn(styles.inputLabel,{
          [styles.invalid]: !isValid.date 
        })} 
        htmlFor="date">
        Дата
      <input
        className={cn(styles.input)}
        name="date"
        id="date"
        type="date"
        value={values.date}
        onChange={ handleChange}
      />
      </label>
      <label className={cn(styles.inputLabel,{
          [styles.invalid]: !isValid.tag 
        })} htmlFor="tag">
        Метка
      <input
        className={cn(styles.input)}
        name="tag"
        id="tag"
        type="text"
        value={values.tag}
        onChange={handleChange}
      />
      </label>
      <textarea 
      className={styles.post} 
      name="post" 
      cols="30" 
      value={values.post}
      rows="10"
      onChange={ handleChange}
      />
      <Button txt="Отправить"  />
    </form>
  );
}

export default JournalForm;
