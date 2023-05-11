let page = 1;

const btn_sig = document.getElementById("btn-sig");
const btn_prev = document.getElementById("btn-prev");

btn_sig.addEventListener("click", () => {
  if (page < 42) {
    page += 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    cargarPersonajes();
  }
});

btn_prev.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    cargarPersonajes();
  } 
});

const cargarPersonajes = async () => {
  try {
    const respuesta = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    console.log(respuesta);
    const datos = await respuesta.json();

    let character = "";
    let name = "";
    datos.results.forEach((personaje) => {
      if (personaje.name.length > 12) {
        name = personaje.name.substring(0, 12) + "...";
      } else {
        name = personaje.name;
      }

      character += `
            <div class="card">
                <div class="card-header">
                <span class="title_character">Rick and Morty</span>
                <span class="line_character"></span>
                <span class="id_character">n°0${personaje.id}</span>
                </div>
        
                <div class="card-body">
                <div class="title_main_character">
                    <span class="name_character">${name}</span>
                    <span class="title_main_icon_container">
                    <div class="icon_character"></div>
                    <div class="icon_character"></div>
                    <div class="icon_character"></div>
                    </span>
                </div>
                <img
                    class="img_character"
                    src="${personaje.image}"
                    alt=""
                />
                </div>
            </div>
            `;
    });

    document.getElementById("app").innerHTML = character;
  } catch (error) {
    console.log(error);
  }
};

cargarPersonajes();
