import { useEffect, useState } from "react";
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import axios from "axios";

const Bracket = (props) => {
    const {player, setPlayer} = props;
    const [name, setName] = useState("");
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
    }, [])
    
      return (
        <div className="bracketCont">
          <h1>Tournament Generator</h1>
          <div className="bracketDisplay">
            {
              matchGenerated ?
              <SingleEliminationBracket
                matches={matches}
                matchComponent={Match}
            /> :
            null
            }
          </div>
            
        </div>
      );
    };

export default Bracket;