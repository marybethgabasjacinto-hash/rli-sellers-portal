/* ============================= */
/* UNIT DETAILS */
/* ============================= */

function showUnitDetails(lotNumber) {

    // GET PROJECT
    const projectSelect = document.getElementById("projectSelect");

    let project = projectSelect.value;

    // DEFAULT PROJECT
    if (project === "") {
        project = "AGAPEYA";
    }


    // UPDATE DETAILS

    document.getElementById("detailProject").textContent = project;

    document.getElementById("detailBlock").textContent = "1";

    document.getElementById("detailLot").textContent = lotNumber;

    document.getElementById("detailLotArea").textContent = "100 sqm";

    document.getElementById("detailFloorArea").textContent = "50 sqm";

    document.getElementById("detailHouseModel").textContent = "Model A";

    document.getElementById("detailPrice").textContent = "₱3,500,000";


    // SHOW POPUP

    const modal = document.getElementById("unitModal");

    modal.style.display = "flex";

}


/* ============================= */
/* CLOSE POPUP */
/* ============================= */

function closeUnitDetails() {

    document.getElementById("unitModal").style.display = "none";

}


/* ============================= */
/* CLOSE WHEN CLICKING OUTSIDE */
/* ============================= */

window.onclick = function(event) {

    const modal = document.getElementById("unitModal");

    if (event.target === modal) {

        closeUnitDetails();

    }

};


/* ============================= */
/* PAYMENT CALCULATOR */
/* ============================= */

function openPaymentCalculator() {

    alert(
        "Payment Calculator\n\n" +
        "We will build the Bank / PAG-IBIG calculator here next."
    );

}


/* ============================= */
/* HOLD UNIT */
/* ============================= */

function holdUnit() {

    const lot =
        document.getElementById("detailLot").textContent;

    const project =
        document.getElementById("detailProject").textContent;

    alert(
        "HOLD REQUEST\n\n" +
        "Project: " + project + "\n" +
        "Block: 1\n" +
        "Lot: " + lot + "\n\n" +
        "Hold request will be processed here."
    );

}


/* ============================= */
/* BACK TO DASHBOARD */
/* ============================= */

function goBack() {

    window.location.href = "index.html";

}
