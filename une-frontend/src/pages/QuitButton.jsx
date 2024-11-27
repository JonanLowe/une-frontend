export default function QuitButton(props) {
  const { socketTest, buttonPressed } = props;

  return (
    <button className="btn btn-outline-danger position-absolute top-0 start-0 m-3" style={{zIndex:1000}}
    onClick={() => {socketTest()}}>
      {buttonPressed? 'pressed!!!!!' : 'Quit'} 
      </button>
  )
}
