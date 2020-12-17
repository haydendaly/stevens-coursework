import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Main from "./Main";
import MyBin from "./MyBin";
import MyPosts from "./MyPosts";
import NewPost from "./NewPost";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});

function App() {
  return (
    <div>
      <header
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#4B4B4B",
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faTrash}
          style={{
            marginLeft: 15,
            marginRight: 15,
            color: "white",
          }}
          size="lg"
        />
        <a style={{ color: "white", fontSize: 30, textDecoration: "none" }} href="/" >Binterest</a>
      </header>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/new-post" component={NewPost} />
            <Route path="/my-bin" component={MyBin} />
            <Route path="/my-posts" component={MyPosts} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
