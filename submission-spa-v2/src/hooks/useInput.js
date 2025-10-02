import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return [value, onChangeHandler];
}

export default useInput;
