import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Bracket from '../components/Bracket'

const Home = (props) => {
    const {player, setPlayer} = props;
    const [matches, setMatches] = useState ([]);
    const [matchGenerated, setMatchGenerated] = useState(false)

    return (
        <div className='components'>
            <div className='sidebar'>
                <Sidebar player={player} setPlayer={setPlayer}
                 matches={matches} setMatches={setMatches}
                 matchGenerated={matchGenerated} setMatchGenerated={setMatchGenerated}/>
            </div>
            <div className='bracket'>
                <Bracket player={player} setPlayer={setPlayer}
                 matches={matches} setMatches={setMatches}
                 matchGenerated={matchGenerated} setMatchGenerated={setMatchGenerated}/>
            </div>
        </div>
    )
}

export default Home;