import React, { useEffect } from "react";
import { Load, Loading } from "../components";
import { AiOutlineGithub } from "react-icons/ai";
import { useApp } from "../contexts/context.js";
import axios from "axios";

const LoadContainer = () => {
  const { image, setImage, loading, setLoading } = useApp();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  async function handleNewSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const Upload = async () => {
      await fetch("/user/upload", {
        method: "POST",
        body: formData,
      }).then((resp) => {
        // console.log(resp);
      });
    };
    Upload();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("/upload", { method: "POST", image: image }, config)
      .then((resp) => {
        // console.log(resp);
      });
  }

  function onImageChange(event) {
    setLoading(true);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  function onRandomButtonClickChange() {
    // usuwanie rezultatu
    setLoading(true);
    let index = Math.ceil(Math.random() * 4);
    setImage(`${process.env.PUBLIC_URL}/examples/example${index}.jpg`);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return (
    <>
      {loading ? <Loading /> : <Loading.ReleaseBody />}
      <Load>
        <Load.Form encType="multipart/form-data" onSubmit={handleNewSubmit}>
          <Load.Label htmlFor="img">Dodaj zdjęcie kart</Load.Label>
          <Load.Input
            type="file"
            id="img"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onImageChange}
          ></Load.Input>
          {/* <input type="file" id="img" name="file" accept="image/*"></input> */}
          <input type="submit"></input>
        </Load.Form>

        {/* {!image ? (
          <Load.Label htmlFor="file-upload">Dodaj zdjęcie kart</Load.Label>
        ) : null} */}
        {/* <Load.Input
          id="file-upload"
          type="file"
          onChange={onImageChange}
          accept="image/png, image/jpeg, image/jpg"
        /> */}

        <Load.OptionsContainer image={image}>
          {/* {image ? (
            <Load.SmallLabel htmlFor="file-upload">
              Dodaj nowe zdjęcie
            </Load.SmallLabel>
          ) : null} */}
          <Load.SmallOptionsContainer>
            <Load.Button onClick={onRandomButtonClickChange}>
              Załaduj losowe
            </Load.Button>
            <Load.GithubLink
              href="https://github.com/filipciesielski7/Poker_Recognizer"
              target="_blank"
            >
              <AiOutlineGithub size={35} />
            </Load.GithubLink>
          </Load.SmallOptionsContainer>
        </Load.OptionsContainer>
        {image ? (
          <Load.Image
            src={image}
            alt="Twoja kombinacja kart"
            id="current_image"
          />
        ) : null}
        {!image ? (
          <>
            <Load.Image
              src={`${process.env.PUBLIC_URL}/original.jpg`}
              alt="Twoja kombinacja kart"
              id="current_image"
            />
            <Load.Image
              src={`${process.env.PUBLIC_URL}/result.jpg`}
              alt="Twoja kombinacja kart"
              id="current_image"
            />
          </>
        ) : null}
        {/* <Load.Image
          src={image ? image : `${process.env.PUBLIC_URL}/poker-cards.png`}
          alt="Twoja kombinacja kart"
          id="current_image"
        /> */}
        {/* {result ? (
          <Load.Image
            src={`${process.env.PUBLIC_URL}/result.jpg`}
            alt="Twoja kombinacja kart"
          />
        ) : null} */}
        {image ? (
          <Load.Button onClick={handleSubmit}>Uruchom algorytm</Load.Button>
        ) : null}
      </Load>
    </>
  );
};

export default LoadContainer;
