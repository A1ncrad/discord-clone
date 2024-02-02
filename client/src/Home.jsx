import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';


export default function Home() {

	return (
		<div className="container">
      <Sidebar></Sidebar>
      <Main></Main>
    </div>
	)
}


function Main() {
  return <main className="main"></main>;
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <Scroller></Scroller>
      <Body></Body>
    </aside>
  );
}


function Body() {
  return (
    <div className="sidebar__body">
      <form className="sidebar__search">
        <input type="search" placeholder="Search" />
      </form>

      <button className="sidebar__button active">
        <FontAwesomeIcon className="icon" icon={faPerson}></FontAwesomeIcon>
        <span>Friends</span>
      </button>

      <button className="sidebar__button">
        <FontAwesomeIcon className="icon" icon={faShop}></FontAwesomeIcon>
        <span>Shop</span>
      </button>
    </div>
  );
}

function Scroller() {
  return (
    <div className="sidebar__scroller scroller">
      <Tile icon={faDiscord} className="scroller__tile active"></Tile>
      <Tile
        className="scroller__tile scroller__tile--green"
        icon={faPlus}
      ></Tile>
      <Tile
        className="scroller__tile scroller__tile--green"
        icon={faCompass}
      ></Tile>
    </div>
  );
}

function Tile({ icon, className }) {
  function handleClick(e) {
    document.querySelector('.scroller__tile.active').classList.remove('active');
    e.currentTarget.classList.add('active');
  }

  return (
    <button className={className} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} className="icon"></FontAwesomeIcon>
    </button>
  );
}