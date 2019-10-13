var ulMode;

$(document).ready(function () {
    initModeImmo();
})

function initModeImmo() {
    ulMode = $("#navMode");
    setModeImmoOnNavbar();
}

function setModeImmoOnNavbar() {
    $.ajax({
        type: 'GET',
        url: "/api/getAllMode",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.getEtat) {
                if (data.getObjet.length > 0) {
                    data.getObjet.map(mode => {
                        var contentMode = `<li><a href="/immo/${mode.intitule}/${mode._id}/liste">Biens en ${mode.intitule}</a></li>`;
                        $("#navMode").append(contentMode)
                    });
                }
            }
            
        }
    });
}