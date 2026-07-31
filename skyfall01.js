// ==============================
// CTRL + K
// ==============================

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});


// ==============================
// BOTÕES "VER MAIS"
// ==============================

const actionButtons =
    document.querySelectorAll(".view-all");

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            "Esta área estará disponível em breve."
        );

    });

});


// ==============================
// PERÍODO DO GRÁFICO
// ==============================

const chartPeriod =
    document.getElementById("chartPeriod");

chartPeriod.addEventListener("change", () => {

    if (chartPeriod.value === "Últimos 12 meses") {

        expensesChart.data.labels = [
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul"
        ];

        expensesChart.data.datasets[0].data = [
            530,
            590,
            620,
            680,
            710,
            720,
            720,
            850,
            790,
            1080,
            1185,
            1284
        ];

    } else {

        expensesChart.data.labels = [
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul"
        ];

        expensesChart.data.datasets[0].data = [
            720,
            850,
            790,
            1080,
            1185,
            1284
        ];

    }

    expensesChart.update();

});
