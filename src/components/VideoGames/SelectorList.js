import React from "react";
import { useDispatch, useLocation, useState } from "../../lib/imported";
import Dropdown from "react-bootstrap/Dropdown";
import { getLeagues, selectByGame } from "../../js/LeaguesSlice";
import { getTeams, selectByGameTeams } from "../../js/TeamsSlice";
const SelectorList = ({ games }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [title, setTitle] = useState();

  const handleFilter = (name) => {
    setTitle(name);
    console.log("this is game id", name);
    console.log("URL ", location);
    localStorage.setItem("GameName", name);

    if (location.pathname === "/teams") {
      dispatch(selectByGameTeams({ name: name }));
    }
    if (location.pathname === "/leagues") {
      dispatch(selectByGame({ name: name }));
    }
  };
    const handleAllGms = () => {
    const selected = "All games";
    setTitle(selected);
    console.log("URL ", location);

    if (location.pathname === "/teams") {
      dispatch(getTeams(0, 50));
    }
    if (location.pathname === "/leagues") {
      console.log("insideee");
      dispatch(getLeagues(0, 50));
    }
  };
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {title ? title : "Video Games"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item variant="secondary" onClick={() => handleAllGms()}>
            All games
          </Dropdown.Item>
          {games.map((game) => (
            <Dropdown.Item
              href={`#/${game.id}`}
              key={game.id}
              onClick={() => handleFilter(game.name)}
            >
              {game.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectorList;
