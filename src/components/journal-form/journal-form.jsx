import styles from "./journal-form.module.css";
import Button from "../button/button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { FORM_INITIAL_STATE, formReducer } from "./journal-form.state";
import { UserContext} from "../../context/user.context";

function JournalForm({ onSubmit, selecetdItem }) {
  const [state, dispatch] = useReducer(formReducer,FORM_INITIAL_STATE)
  const {isValid, isFormReadyToSubmit, values} = state
  const titleRef = useRef(null)
  const dateRef = useRef(null)
  const tagRef = useRef(null)
  const postRef = useRef(null)
  const { userId } = useContext( UserContext)
  function focusError(isValid) {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.tag:
				tagRef.current.focus();
				break;
			case !isValid.post:
				postRef.current.focus();
				break;
			default:
				break;
		}
	}
  useEffect( () => {
    if (selecetdItem) {
      dispatch({type:"SET_VALUE", payload:{ ...selecetdItem } })
    }
  },[selecetdItem])

  useEffect(() => dispatch({type:"SET_VALUE", payload:{ userId }}),[userId])
  useEffect(() => {
    let timerId 
    timerId = setTimeout(()=> {
      focusError(isValid)
      dispatch({type:"RESET_VALID"})
    },2000) 
    return () => {
      clearTimeout(timerId)
    }
  } ,[isValid])
  
  useEffect(() => {
    if (isFormReadyToSubmit) {
      console.log(state );
      
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
    dispatch({type:"SUBMIT", payload:{...formValues,userId, id: selecetdItem.id ?? null }})
  };

  return (
    <form onSubmit={onSubmitForm} className={styles.journalForm}>
      <input
      ref={titleRef}
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
      ref={dateRef}
        className={cn(styles.input)}
        name="date"
        id="date"
        type="date"
        value={values.date? new Date(values.date).toISOString().slice(0,10):values.date}
        onChange={ handleChange}
      />
      </label>
      <label className={cn(styles.inputLabel,{
          [styles.invalid]: !isValid.tag 
        })} htmlFor="tag">
        Метка
      <input
      ref={tagRef}
        className={cn(styles.input)}
        name="tag"
        id="tag"
        type="text"
        value={values.tag}
        onChange={handleChange}
      />
      </label>
      <textarea 
      ref={postRef}
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
