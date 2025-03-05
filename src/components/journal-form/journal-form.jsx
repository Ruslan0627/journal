import styles from "./journal-form.module.css";
import Button from "../button/button";
import { useState } from "react";
import cn from "classnames";

function JournalForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    tag: ""
  });

  const [formValid, setFormValid] = useState({
    title: true,
    date: true,
    tag: true
  });

  const handleChange = (e, key) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormValid((prev) => ({ ...prev, [key]: !!value }));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.tag) {
      setFormValid({
        title: !!formData.title,
        date: !!formData.date,
        tag: !!formData.tag
      });
      return
    }
    onSubmit(formData);
    setFormData({ title: "", date: "", tag: "" });
    setFormValid({ title: true, date: true, tag: true });
  };

  return (
    <form onSubmit={onSubmitForm} className={styles.journalForm}>
      <input
      placeholder="Введите заголовк"
        className={cn(styles.title,styles.input,{
          [styles.invalid]: !formValid.title 
        })}
        name="title"
        type="text"
        value={formData.title}
        onChange={(e) => handleChange(e, "title")}
      />
      <label className={cn(styles.inputLabel,{
          [styles.invalid]: !formValid.date 
        })} 
        htmlFor="date">
        Дата
      <input
        className={cn(styles.input)}
        name="date"
        id="date"
        type="date"
        value={formData.date}
        onChange={(e) => handleChange(e, "date")}
      />
      </label>
      <label className={cn(styles.inputLabel,{
          [styles.invalid]: !formValid.tag 
        })} htmlFor="tag">
        Метка
      <input
        className={cn(styles.input)}
        name="tag"
        id="tag"
        type="text"
        value={formData.tag}
        onChange={(e) => handleChange(e, "tag")}
      />
      </label>
      <textarea className={styles.post} name="post" cols="30" rows="10"></textarea>
      <Button txt="Отправить" disabled={!formValid.title || !formValid.date || !formValid.tag} />
    </form>
  );
}

export default JournalForm;
