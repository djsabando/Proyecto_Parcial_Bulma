window.addEventListener("load", async function () {
  const response = await fetch(
    "https://www.episodate.com/api/most-popular?page=1"
  );
  const result = await response.json();

  const select = this.document.getElementById("series-select");
  result.tv_shows.forEach((show) => {
    let option = this.document.createElement("option");
    option.value = show.id;
    option.innerHTML = show.name;
    select.appendChild(option);
  });
});

async function selectCambia() {
  //Obtiene elementos contenedores de graficos
  const ctxRef = document.getElementById("chart-wrapper");
  const ctxRef2 = document.getElementById("pie-wrapper");
  //Limpia previos graficos
  ctxRef.replaceChildren();
  ctxRef2.replaceChildren();

  //Obitiene valor de opcion
  var val = document.getElementById("series-select").value;

  //Valida que el valor no este en blanco
  if (val !== "") {
    //Obtiene datos de serie seleccionada
    const response = await fetch(
      `https://www.episodate.com/api/show-details?q=${val}`
    );
    const result = await response.json();

    //Crea nuevo canva de grafico de barras
    let canvas = this.document.createElement("canvas");
    canvas.setAttribute("id", "bar-chart");
    //Agregar
    ctxRef.appendChild(canvas);

    //Obtiene el contexto del nuevo canvas creado
    const ctx = document.getElementById("bar-chart");
    //Crea y Modela los datos del grafico
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Episodios", "Rating", "Duración Episodio"],
        datasets: [
          {
            label: result.tvShow.name,
            data: [
              result.tvShow.episodes.length,
              result.tvShow.rating,
              result.tvShow.runtime,
            ],
            borderWidth: 1,
            backgroundColor: ["#27AE60", "#884EA0", "#D35400"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    //Crea nuevo canva de grafico pie
    let canvas2 = this.document.createElement("canvas");
    canvas2.setAttribute("id", "pie-chart");
    //Agrega canva a contenedor
    ctxRef2.appendChild(canvas2);
    const ctx2 = document.getElementById("pie-chart");
    new Chart(ctx2, {
      type: "pie",
      data: {
        labels: result.tvShow.genres,
        datasets: [
          {
            label: "# of Votes",
            data: result.tvShow.genres.map((el) => 1),
            borderWidth: 1,
            backgroundColor: [
              "#1F618D",
              "#F1C40F",
              "#27AE60",
              "#884EA0",
              "#D35400",
            ],
          },
        ],
      },
    });
  }
}
