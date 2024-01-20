import { createContext, useContext } from "react";
import { useState } from "react";

const mainContext = createContext({ value: false });

function MainProvider({ children }) {
  const [booleanValue, setBooleanValue] = useState(true);
  const [userValue, setUserValue] = useState("");
  const [showUserValue, setShowUserValue] = useState("");
  const [imageDataFromApi, setImageDataFromApi] = useState([]);
  const [loader, showLoader] = useState("");

  function onClickSearchButton() {
    showLoader("loading");
    setBooleanValue(false);
    setShowUserValue(userValue);
    setUserValue("");

    const key = "41913448-6fe0696dc3241e44a8839e52f";
    const url =
      "https://pixabay.com/api/" +
      `?key=${key}` +
      `&q=${userValue}` +
      `&per_page=6`;

    console.log(url);
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setImageDataFromApi(data.hits);
          showLoader("success");
        })
        .catch((err) => {
          showLoader("failed");
        });
    } catch (error) {
      showLoader("failed");
    }
  }

  function onChangeinputValue(event) {
    setUserValue(event.target.value);
  }

  return (
    <mainContext.Provider
      value={{
        booleanValue,
        userValue,
        onClickSearchButton,
        onChangeinputValue,
        showUserValue,
        imageDataFromApi,
        loader,
      }}
    >
      {children}
    </mainContext.Provider>
  );
}

const useMain = () => useContext(mainContext);

export { MainProvider, useMain };
