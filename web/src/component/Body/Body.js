import './Body.css';

function Body(props) {
  return (
    <section className="Body">
      {props.children}
    </section>
  );
}

export default Body;