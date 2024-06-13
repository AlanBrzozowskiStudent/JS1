import React, { useState } from "react";
import axios from "axios";
import {  Form,  Button,  Container,  Alert,  Row,  Col,  Image} from "react-bootstrap";

function AddAdPage() {
  const initialAdState = {
    title: "",
    description: "",
    location: "",
    phoneNumber: "",
    price: "",
    creator: localStorage.getItem("username"),
    published: true,
  };

  const [ad, setAd] = useState(initialAdState);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAd({ ...ad, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      setMessage("You can only upload up to 3 images.");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(newPreviews).then((previewsData) => {
      setPreviews([...previews, ...previewsData]);
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    document.getElementById("images-input").value = "";
  };

  const resetForm = () => {
    setAd(initialAdState);
    setImages([]);
    setPreviews([]);
    document.getElementById("images-input").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(ad).forEach((key) => formData.append(key, ad[key]));
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post("api/ads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Ad added successfully!");
      resetForm();
    } catch (error) {
      setMessage(
        `Failed to add ad. Error: ${
          error.response.data.message || error.message
        }`
      );
      console.error("Error adding ad:", error);
    }
  };

  const handleToggle = (e) => {
    setAd({ ...ad, published: e.target.checked });
  };

  return (
    <Container>
      <h1>Add New Ad</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={ad.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={ad.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={ad.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={ad.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={ad.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Button
            onClick={() => document.getElementById("images-input").click()}
          >
            Select images
          </Button>
          <p>Max. 3 images</p>
          <Form.Control
            type="file"
            id="images-input"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {previews.map((preview, index) => (
            <div key={index} className="mt-2">
              {index === 0 ? <p>Main Image</p> : <p>Image numer {index + 1}</p>}
              <Image
                src={preview}
                thumbnail
                style={{ width: "100px", height: "auto" }}
              />
              <Button
                variant="danger"
                className="ms-2"
                onClick={() => handleRemoveImage(index)}
                style={{ display: "inline-block" }}
              >
                Remove
              </Button>
            </div>
          ))}
        </Form.Group>
        <Row>
          <Col className="mb-3">
            <Form.Group>
              <Form.Check
                type="switch"
                id="published-switch"
                label={ad.published ? "Ad is published" : "Ad is a draft"}
                checked={ad.published}
                onChange={handleToggle}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <Button className="mb-4" variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddAdPage;
