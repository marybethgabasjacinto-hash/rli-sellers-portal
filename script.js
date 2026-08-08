/* =========================================
   SHOW MIDDLE HOUSING
========================================= */

function showHousing() {

    document.getElementById("housingSection").style.display = "block";

    document.getElementById("condoSection").style.display = "none";

    document.getElementById("inventorySection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   SHOW MIDDLE CONDO
========================================= */

function showCondo() {

    document.getElementById("housingSection").style.display = "none";

    document.getElementById("condoSection").style.display = "block";

    document.getElementById("inventorySection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   OPEN PROJECT
========================================= */

function openProject(projectName) {

    document.getElementById("housingSection").style.display = "none";

    document.getElementById("condoSection").style.display = "none";

    document.getElementById("inventorySection").style.display = "block";

    document.getElementById("selectedProject").innerText = projectName;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   BACK TO PROJECTS
========================================= */

function backToProjects() {

    document.getElementById("inventorySection").style.display = "none";

    document.getElementById("housingSection").style.display = "none";

    document.getElementById("condoSection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   UNIT DETAILS
========================================= */

function showUnitDetails(block, lot) {

    let project =
        document.getElementById("selectedProject").innerText;


    document.getElementById("detailProject").innerText =
        project;


    document.getElementById("detailBlock").innerText =
        block;


    document.getElementById("detailLot").innerText =
        lot;


    document.getElementById("detailLotArea").innerText =
        "100 sqm";


    document.getElementById("detailFloorArea").innerText =
        "50 sqm";


    document.getElementById("detailHouseModel").innerText =
        "Model A";


    document.getElementById("detailPrice").innerText =
        "₱3,500,000";


    document.getElementById("unitModal").style.display =
        "flex";
}


/* =========================================
   CLOSE UNIT DETAILS
========================================= */

function closeUnitDetails() {

    document.getElementById("unitModal").style.display =
        "none";
}


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

function closeOutside(event) {

    if (event.target ===
        document.getElementById("unitModal")) {

        closeUnitDetails();
    }
}


/* =========================================
   PAYMENT CALCULATOR
========================================= */

function openPaymentCalculator() {

    alert(
        "Payment Calculator\n\n" +
        "Next step: ikokonekta natin dito " +
        "ang actual Payment Calculator."
    );
}


/* =========================================
   HOLD UNIT
========================================= */

function holdUnit() {

    let project =
        document.getElementById("detailProject").innerText;

    let block =
        document.getElementById("detailBlock").innerText;

    let lot =
        document.getElementById("detailLot").innerText;


    alert(
        "HOLD THIS UNIT\n\n" +
        "Project: " + project +
        "\nBlock: " + block +
        "\nLot: " + lot
    );
}
