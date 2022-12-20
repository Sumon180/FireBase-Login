import { useEffect, useState, useRef } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { storage, db } from "../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

interface IUser {
  name: string;
  email: string;
  info: string;
  contact: string;
}

const initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};

const AddEditUser = () => {
  const [data, setData] = useState<IUser>(initialState);
  const { name, email, info, contact } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState({});
  const [url, setUrl] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   id && getSingleUser();
  // }, [id]);

  // type userData = {
  //   name: string;
  //   email: string;
  //   info: string;
  //   contact: string;
  // };

  // const getSingleUser = async () => {
  //   const docRef = doc(db, "users", id + "151");
  //   const snapshot = await getDoc(docRef);
  //   if (snapshot.exists()) {
  //     setData(snapshot.data() as userData);
  //   }
  // };

  useEffect(() => {
    // const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress: any =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is Pause");
            break;
          case "running":
            console.log("Upload is Running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, img: downloadURL }));
        });
      }
    );
  }, [file]);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is Required";
    }
    if (!email) {
      errors.email = "Email is Required";
    }
    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let errors = validate();
    if (Object.keys(errors).length) return setError(errors);
    setIsSubmit(true);
    await addDoc(collection(db, "users"), {
      ...data,
      timestamp: serverTimestamp(),
    });
    navigate("/");
  };

  return (
    <div>
      <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              {isSubmit ? (
                <Loader active inline="centered" size="huge" />
              ) : (
                <>
                  <h2>Add User</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Input
                      label="Name"
                      name="name"
                      error={error.name ? { content: error.name } : null}
                      placeholder="Enter Name"
                      value={name}
                      onChange={handleChange}
                      autoFocus
                    />
                    <Form.Input
                      label="Email"
                      name="email"
                      error={error.email ? { content: error.email } : null}
                      placeholder="Enter Email"
                      value={email}
                      onChange={handleChange}
                    />
                    <Form.TextArea
                      label="Info"
                      name="info"
                      placeholder="Enter Your Information"
                      value={info}
                      onChange={handleChange}
                    />
                    <Form.Input
                      label="Contact"
                      name="contact"
                      placeholder="Enter Contact Number"
                      value={contact}
                      onChange={handleChange}
                    />
                    <Form.Input
                      label="Upload"
                      type="file"
                      onChange={(e: any) => setFile(e.target.files[0])}
                    />
                    <Button
                      primary
                      type="submit"
                      disabled={progress !== null && progress < 100}
                    >
                      Submit
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AddEditUser;
