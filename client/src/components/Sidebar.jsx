import { useEffect, useState } from "react";
import axios from "axios";
const Sidebar = (props) => {
    const {player, setPlayer} = props;
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [isEditingById, setIsEditingById] = useState();
    const {matches, setMatches} = props;
    const {matchGenerated, setMatchGenerated} = props;


    useEffect(() => {
        axios.get("http://localhost:8000/api/players")
            .then((res) => {
                setPlayer(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [player])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/players", {
            name
        })
            .then((res) => {
                setName("");
    })
            .catch((error) => {
                setErrors(error.response.data.errors);
            })
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/players/${id}`);
    }

    const updateHandler = (e) => {
        e.preventDefault();
        const id = isEditingById
        axios.put(`http://localhost:8000/api/players/${id}`, {
            name
        })
            .then((res) => {
                setName("");
                setIsEditingById();
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
            })
    }
    // Fisher-Yates shuffle I found online to randomize the matchups in the tournament
    function shuffle(array) {
        let currentIndex = array.length;
      
        while (currentIndex != 0) {
      
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }

    const matchGenerator = () => {
        matches.length = 0;
        let playerCopy = [...player];
        shuffle(playerCopy)
        let matchId = 1
        for (let i = 0; i <= playerCopy.length - 1; i += 2) {
          matches.push({
            id: matchId,
            name: "Match " + matchId,
            nextMatchId: null,
            tournamentRoundText: 1,
            participants: [
              { name: playerCopy[i].name },
              { name: playerCopy[i + 1].name }
            ]
          })
            matchId++
        }
        const lastMatch = matches[matches.length - 1];
        let matchesCopy = [...matches];
        let nextId = lastMatch.id + 1;
        let roundNum = 0
        for (let i = 0; i < matchesCopy.length - 1; i++) {
          matches.push({
            id: nextId,
              name:  "Match " + matchId,
              nextMatchId: null,
              tournamentRoundText: roundNum,
              participants: [
                { name: null},
                { name: null}
              ]
          })
            matchId++
            nextId++
            nextId <= 25 ? roundNum = 2 : roundNum = 3;
        }
        for (let i = 0, k = 0, y = 0; i < matches.length - 1; i++, y++) {
          matches[i].nextMatchId = matches.length - player.length/2 + 2 + k
          if(y % 2 == 1)
            k++
        }
        setMatchGenerated(true)
    }

    return (
        <div className="sidebarCont">
            <div>
                <form className="form" onSubmit={submitHandler}>
                    {
                        errors.name && <p className="errors">{errors.name.message}</p>
                    }
                    <input 
                    className="playerInput"
                    type="text"
                    placeholder="Player Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    <button className="button">Add Player</button>
                </form>
            </div>
            <div>
                {
                    player.map((player) => (
                        <div className="playerList" key={player._id}>
                            {
                                isEditingById == player._id ? (
                                    <div className="playerList">
                                        <button className="buttonDelete"
                                         onClick={() => deleteHandler(player._id)}>Delete</button>
                                        <form onSubmit={updateHandler}>
                                            <input 
                                            type="text" 
                                            placeholder={player.name} 
                                            onChange={(e) => setName(e.target.value)}/>
                                            <button className="buttonSave">Save</button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="playerList">
                                        <button className="buttonDelete" onClick={() => deleteHandler(player._id)}>Delete</button>
                                        <p className="name">{player.name}</p>
                                        <button className="buttonEdit" onClick = {() => setIsEditingById(player._id)}>Edit</button>
                                    </div>
                                )
                                
                            }
                        </div>
                    ))
                }
            </div>
            <button className="genButton" onClick={matchGenerator}>Generate Tournament</button>
        </div>
    )
}

export default Sidebar;