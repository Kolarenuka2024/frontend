import "../styles/home.css";
import Header from "./header";
function Home() {
  return (
    <>
    <div className="home-container">
    <Header/>
      <div className="container-home">
        <h1>Welcome to Our Educational Platform</h1>
        <p>Choose the best for your future</p>
          <input type="text" name="query" placeholder="Search here" />
          <button type="submit" className="button">Search</button>
      </div>
      <div class="local">
        <div class="box">
            <h2>python</h2>
            <button>check</button>
       </div>
        <div class="box">
        <h2>java</h2>
        <button>check</button>
        </div>
        <div class="box">
        <h2>c++</h2>
        <button>check</button>
        </div>
         </div><br></br><br></br><br></br><br></br>
         <div class="local">
         <div class="box">
            <h2>c programming</h2>
            <button>check</button>
       </div>
        <div class="box">
        <h2>sql</h2>
        <button>check</button>
        </div>
        <div class="box">
        <h2>web designing</h2>
        <button>check</button>
        </div>
        </div>

    </div>
    </>
  );
}

export default Home;
