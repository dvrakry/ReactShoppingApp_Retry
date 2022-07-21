import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.filePath]);
        //부모에 변경한 이미지 정보 보내기위해
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("Failed to save images");
      }
    });
  };

  const deleteHandler = (image) => {
    const currenIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currenIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      {Images.map((image, index) => (
        <div onClick={() => deleteHandler(image)} key={index}>
          <img
            style={{ display: "flex", width: "350px", height: "240px" }}
            src={`http://localhost:5000/${image}`}
          />
        </div>
      ))}
    </div>
  );
}

export default FileUpload;
