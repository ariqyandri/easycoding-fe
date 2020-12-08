import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUser, getAllUsers } from "../../store/allUsers/actions";
import { selectAllUsers } from "../../store/allUsers/selectors";
import { Button, Container, Jumbotron, Table } from "react-bootstrap";

export default function ManageUsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  console.log("what is users", users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleBlock = (e) => {
    e.preventDefault();
    dispatch(blockUser(e.target.value));
  };

  return (
    <Jumbotron>
      <Container>
        <h3
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          All Users
        </h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Blocked</th>
            </tr>
          </thead>
          <tbody>
            {!users
              ? "...Loading"
              : users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{!user.isAdmin ? "No" : "Yes"}</td>
                      <td>
                        <Button
                          onClick={handleBlock}
                          value={user.id}
                          variant={
                            !user.accountBlocked ? "secondary" : "danger"
                          }
                        >
                          {!user.accountBlocked ? "Block" : "Unblock"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </Container>
    </Jumbotron>
  );
}
