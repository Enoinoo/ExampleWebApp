import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
  query getUsers {
    findManyUser {
      id
      name
    }
  }
`;

interface User {
  id: number;
  name: string;
}

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading ...</p>;
  if (error) console.log(error);
  return (
    <div>
      {data.findManyUser.map((user: User) => (
        <span key={user.id}>{user.name}</span>
      ))}
    </div>
  );
};

export default UserList;
