import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list: any = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <Container>
        <h1>Users Information</h1>
        <hr />
        <br />
        <br />
        <Card.Group>
          <Grid columns={3} stackable>
            {users &&
              users.map((item) => (
                <Grid.Column>
                  <Card key={item.id}>
                    <Card.Content>
                      <Image
                        src={item.img}
                        style={{
                          height: "150px",
                          width: "150px",
                          borderRadius: "50%",
                        }}
                      />
                      <Card.Header style={{ marginTop: "10px" }}>
                        {item.name}
                      </Card.Header>
                      <Card.Description>{item.info}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div>
                        <Button
                          color="green"
                          onClick={() => navigate(`/update/${item.id}`)}
                        >
                          Update
                        </Button>
                        <Button color="purple">View</Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
          </Grid>
        </Card.Group>
      </Container>
    </>
  );
};

export default Home;
